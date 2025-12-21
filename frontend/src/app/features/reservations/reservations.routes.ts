import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reservation-list/reservation-list.component').then(m => m.ReservationListComponent)
  }
];
