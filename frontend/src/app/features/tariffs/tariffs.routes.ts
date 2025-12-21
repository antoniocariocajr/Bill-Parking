import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./tariff-list/tariff-list.component').then(m => m.TariffListComponent)
  }
];
