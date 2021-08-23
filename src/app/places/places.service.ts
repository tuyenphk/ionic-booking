import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  private placesArray: Place[] = [
    new Place('p1','Manhattan Mansion', 'In the heart of new york city', 'https://i.ibb.co/wJh6hGB/new-york-city-3840x1600.jpg', 999),
    new Place('p2','Moxy NYC East Village', 'Small-but-smartly built rooms, airport-style check-ins, and no-frills service', 'https://i.ibb.co/fqqG4vK/moxy-east-village-check-in.jpg', 199),
    new Place('p3','Hotel Central Park', 'Eco-conscious hotel', 'https://i.ibb.co/CtyFL4h/central-park-facade-at-1-hotel-central-park.jpg', 99)
  ];

  get places(){
    return [...this.placesArray];
  }

  constructor() { }

  getPlace(id: string) {
    return {...this.placesArray.find(p => p.id === id)};
  }
}
