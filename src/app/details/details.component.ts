import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

//
// This code gives the DetailsComponent access to the ActivatedRoute
// router feature that enables you to have access to the data about the current route. In the constructor, the
// code converts the id parameter acquired from the route from a string to a number.
//  Learn More LINK


// Notice that the housingLocation properties are being accessed with the optional chaining operator ?.
//   This ensures that if the housingLocation value is null or undefined the application doesn't crash.


// template : The template now includes an event handler (submit)="submitApplication()".
//   Angular uses parentheses syntax around the event name to define events in the template code.
//   The code on the right hand side of the equals sign is the code that should be executed when this event is triggered. You can bind to browser events and custom events
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
           alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;


  // In Angular, FormGroup and FormControl are types that enable you to build forms.
  // The FormControl type can provide a default value and shape the form data. In this example firstName is a string and the default value is empty string.

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  //update either synchronous or asynchronous version of data
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
  //handles Apply now

  // In your app:
  //   Select a housing location and click Learn more, to see details about the house.
  // In the house's details page, scroll to the bottom to find the new form.
  // Enter data into the form's fields - any data is fine.
  // Choose Apply now to submit the data.
  // In the developer tools window, review the log output to find your form data.
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
