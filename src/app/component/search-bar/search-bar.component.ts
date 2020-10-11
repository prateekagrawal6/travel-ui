import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService, Fare, Location } from 'src/app/data.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {


  originList: Location[];
  destinationList: Location[];

  originSearchText: string
  destinationSearchText: string

  originDelay: any
  destinationDelay: any

  originSelected: Location
  destinationSelected: Location

  isFareLoading: boolean = false;

  error: string 

  @ViewChild('autocompleteOriginInput') autocompleteOriginInput: ElementRef;
  @ViewChild('autocompleteDestinationInput') autocompleteDestinationInput: ElementRef;

  totalFare: string

  constructor(private dataService: DataService) {
    this.originList = [];
    this.destinationList = [];
  }

  onChangeOrigin(value: string) {
    this.totalFare = '';
    this.originSearchText = value
    if (this.originDelay) {
      clearTimeout(this.originDelay)
    }
    this.originDelay = setTimeout(() => {
      this.dataService.getSearchCode(this.originSearchText).subscribe((res: Location[]) => {
        console.log(res)
        this.originList = res;
      })
    }, 1000)
  }

  onChangeDestination(value: string) {
    this.totalFare = '';
    this.destinationSearchText = value
    if (this.destinationDelay) {
      clearTimeout(this.destinationDelay)
    }
    this.destinationDelay = setTimeout(() => {
      this.dataService.getSearchCode(this.destinationSearchText).subscribe((res: Location[]) => {
        console.log(res)
        this.destinationList = res;
      })
    }, 1000)
  }

  onOriginSelect(origin: Location) {
    this.originSelected = origin;
    this.autocompleteOriginInput.nativeElement.value = this.originSelected.code + " | " + this.originSelected.name;
  }

  onDestinationSelect(destination: Location) {
    this.destinationSelected = destination;
    this.autocompleteDestinationInput.nativeElement.value = this.destinationSelected.code + " | " + this.destinationSelected.name;
  }

  getFare() {
    
    if ( this.originSelected?.code && this.destinationSelected?.code) {
    this.isFareLoading = true;
    this.totalFare = '' ;
    this.error = '' ;
    this.dataService.getFare(this.originSelected.code, this.destinationSelected.code).subscribe((res: Fare) => {
      this.totalFare = res.fare.amount + " " + res.fare.currency;
      this.isFareLoading = false;
    }, err => {
      this.error = err;
      this.isFareLoading = false;
    })
  } else {
    this.error = "Please select Origin/ Destination properly";
  }
}


}
