import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import {RouterLink} from "@angular/router";
import {RouterOutlet} from "@angular/router";


// Using the {{ expression }} in Angular templates, you can render values from properties, Inputs and valid JavaScript expressions.
// [] incoming () outgoing (receiving)
@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="'https://angular.io/assets/images/tutorials/faa' + housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})

// ! added because input expecting the value to be passed (non-null assertion)
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;
}
