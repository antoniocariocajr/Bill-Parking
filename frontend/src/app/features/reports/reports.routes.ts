import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'daily',
    loadComponent: () => import('./daily-report/daily-report.component').then(m => m.DailyReportComponent)
  },
  {
    path: 'monthly',
    loadComponent: () => import('./monthly-report/monthly-report.component').then(m => m.MonthlyReportComponent)
  }
];
