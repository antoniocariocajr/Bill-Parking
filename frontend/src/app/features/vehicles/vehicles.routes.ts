import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./vehicle-list/vehicle-list.component').then(m => m.VehicleListComponent)
  }
];
