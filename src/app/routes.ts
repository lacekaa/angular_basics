import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

//The entries in the routeConfig array represent the routes in the application.
// The first entry navigates to the HomeComponent whenever the url matches ''.
// The second entry uses some special formatting that will be revisited in a future lesson.

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Home details'
  }
];

export default routeConfig;
