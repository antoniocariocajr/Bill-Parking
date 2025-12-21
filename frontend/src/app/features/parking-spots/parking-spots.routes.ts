import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./parking-spot-list/parking-spot-list.component').then(m => m.ParkingSpotListComponent)
  }
];
