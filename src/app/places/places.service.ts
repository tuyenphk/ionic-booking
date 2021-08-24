import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  private placesArray: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of new york city',
      'https://i.ibb.co/wJh6hGB/new-york-city-3840x1600.jpg',
      999,
      new Date('2021-01-01'),
      new Date('2030-12-31'),
      'abc'
    ),
    new Place(
      'p2',
      'Moxy NYC East Village',
      'Small-but-smartly built rooms, airport-style check-ins, and no-frills service',
      'https://i.ibb.co/fqqG4vK/moxy-east-village-check-in.jpg',
      199,
      new Date('2021-01-01'),
      new Date('2030-12-31'),
      'abc'
    ),
    new Place(
      'p3',
      'Hotel Central Park',
      'Eco-conscious hotel',
      'https://i.ibb.co/CtyFL4h/central-park-facade-at-1-hotel-central-park.jpg',
      99,
      new Date('2021-01-01'),
      new Date('2030-12-31'),
      'abc'
  )
  ];

  get places(){
    return [...this.placesArray];
  }

  constructor(private authService: AuthService) { }

  getPlace(id: string) {
    return {...this.placesArray.find(p => p.id === id)};
  }

  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      'https://i.ibb.co/wJh6hGB/new-york-city-3840x1600.jpg',
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.placesArray.push(newPlace);
  }

}
