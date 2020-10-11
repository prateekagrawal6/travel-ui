import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  mocklocationArray: Location[] = [
    {
      "code": "BJX",
      "name": "Guanajuato Del Bajio",
      "description": "Leon-Guanajuato - Guanajuato Del Bajio (BJX), Mexico"
    },
    {
      "code": "MDE",
      "name": "Cordova",
      "description": "Medellin - Cordova (MDE), Colombia"
    },
    {
      "code": "ADL",
      "name": "Adelaide Intl. Airport",
      "description": "Adelaide - Adelaide Intl. Airport (ADL), Australia"
    },
    {
      "code": "ESC",
      "name": "Delta County",
      "description": "Escanaba - Delta County (ESC), USA"
    },
    {
      "code": "PHL",
      "name": "Philadelphia Intl.",
      "description": "Philadelphia - Philadelphia Intl. (PHL), USA"
    },
    {
      "code": "PTP",
      "name": "Le Raizet",
      "description": "Pointe a Pitre - Le Raizet (PTP), Guadeloupe"
    },
    {
      "code": "SBH",
      "name": "St. Barthelemy",
      "description": "St. Barthelemy - St. Barthelemy (SBH), Guadeloupe"
    },
    {
      "code": "DEL",
      "name": "Indira Gandhi International",
      "description": "Delhi - Indira Gandhi International (DEL), India"
    },
    {
      "code": "LUX",
      "name": "Findel Airport",
      "description": "Luxembourg - Findel Airport (LUX), Luxembourg"
    }
  ]
  mockFare: Fare = {
    "fare": {
      "amount": 215.15,
      "currency": "EUR",
      "origin": "AMS",
      "destination": "JFK"
    },
    "origin": {
      "code": "BDJ",
      "name": "Sjamsudin Noor",
      "description": "Banjarmasin - Sjamsudin Noor (BDJ), Indonesia"
    },
    "destination": {
      "code": "JFK",
      "name": "John F. Kennedy International",
      "description": "New York - John F. Kennedy International (JFK), USA"
    }
  }

  getSearchCode(term: string): Observable<Location[]> {
    const searchCodeURL = `http://localhost:9090/search/code?term=${term}`
    return this.http.get<Location[]>(searchCodeURL);
    // return of(this.mocklocationArray)
  }

  getFare(origin: string, destination: string): Observable<Fare> {
    const getFareURL = `http://localhost:9090/fares/${origin}/${destination}`;
    return this.http.get<Fare>(getFareURL);
    // return of(this.mockFare)
  }

}
export interface Location {
  name: string
  code: string
  description: string
}

export interface FareData {
  amount: number,
  currency: string,
  origin: string,
  destination: string
}

export interface Fare {
  fare: FareData
  origin: Location
  destination: Location
}