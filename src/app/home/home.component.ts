import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

// adding classes may always be added in imports, interfaces through export class below


// When adding a property binding to a component tag, we use the [attribute] = "value" syntax to notify Angular
// that the assigned value should be treated as a property from the component class and not a string value.
//   The value on the right handside is the name of the property from the HomeComponent.
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})

// receiving its data from housing.service.ts

// filter function only gets triggered when clicking not enter ! Might be added

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }

    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }


  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });
  }
}
