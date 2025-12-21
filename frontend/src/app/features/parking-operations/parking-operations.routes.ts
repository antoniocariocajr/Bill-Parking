import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'entry',
                loadComponent: () => import('./entry-registration/entry-registration.component').then(m => m.EntryRegistrationComponent)
            },
            {
                path: 'active-sessions',
                loadComponent: () => import('./active-sessions/active-sessions.component').then(m => m.ActiveSessionsComponent)
            },
            {
                path: 'exit/:id',
                loadComponent: () => import('./exit-payment/exit-payment.component').then(m => m.ExitPaymentComponent)
            }
        ]
    }
];
