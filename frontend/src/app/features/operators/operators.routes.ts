import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./operator-list/operator-list.component').then(m => m.OperatorListComponent)
  }
];
