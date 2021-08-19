import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {

  private placesArray: Place[] = [
    new Place('p1','Manhattan Mansion', 'In the heart of new york city', 'https://i.ibb.co/wJh6hGB/new-york-city-3840x1600.jpg', 149),
    new Place('p2','Cali', 'In the heart of new york city', 'https://i.ibb.co/wJh6hGB/new-york-city-3840x1600.jpg', 99),
    new Place('p3','Philadelphia', 'In the heart of new york city', 'https://i.ibb.co/wJh6hGB/new-york-city-3840x1600.jpg', 99)
  ];

  get places(){
    return [...this.placesArray];
  }

  constructor() { }

  getPlace(id: string) {
    return {...this.placesArray.find(p => p.id === id)};
  }
}
