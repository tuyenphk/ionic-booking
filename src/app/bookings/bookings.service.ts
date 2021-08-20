import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  private bookins: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Mahattan Mansion',
      guestNumber: 2,
      userId: 'abc'
    }
  ];
  constructor() { }

  get bookings() {
    return [...this.bookins];
  }
}
