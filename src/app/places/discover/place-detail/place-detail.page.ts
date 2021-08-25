import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { BookingsService } from 'src/app/bookings/bookings.service';
import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  place: Place;
  isBookable = false;
  isLoading = false;
  private placesSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingsService: BookingsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('places/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.placesSub = this.placesService
      .getPlace(paramMap.get('placeId'))
      .subscribe(place => {
        this.place = place;
        this.isBookable = place.userId !== this.authService.userId;
        this.isLoading = false;
      },
      error => {
        this.alertCtrl.create({
          header: 'An error occured',
          message: 'Could not load place',
          buttons: [{
            text: 'Okay',
            handler: ()=>{
              this.router.navigate(['/places/tabs/discover']);
            }
          }]
        }).then(alertEl=>
          alertEl.present()
        );
      });
    });
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  // open the Create Booking Modal
  onBookPlace() {
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    this.actionSheetCtrl.create({
      header: 'Choose an Action',
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModal('select');
          }
        },
        {
          text: 'Radom Date',
          handler: () => {
            this.openBookingModal('random');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionEl => {
      actionEl.present();
    });
  }

  openBookingModal(mode: 'select' | 'random'){
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {selectedPlace: this.place, selectedMode: mode}
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();//listener
      })
      .then(resultData => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === 'confirm'){
          this.loadingCtrl
            .create({message: 'Booking place...'})
            .then(loadingEl => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingsService.addBooking(
                this.place.id,
                this.place.title,
                this.place.imgUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              ).subscribe(() => {
                loadingEl.dismiss();
              });
            });
        }
      });
  }

}
