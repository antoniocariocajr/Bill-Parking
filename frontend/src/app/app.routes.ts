import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'parking-operations',
                loadChildren: () => import('./features/parking-operations/parking-operations.routes').then(m => m.routes)
            },
            {
                path: 'parking-spots',
                loadChildren: () => import('./features/parking-spots/parking-spots.routes').then(m => m.routes)
            },
            {
                path: 'tariffs',
                loadChildren: () => import('./features/tariffs/tariffs.routes').then(m => m.routes)
            },
            {
                path: 'clients',
                loadChildren: () => import('./features/clients/clients.routes').then(m => m.routes)
            },
            {
                path: 'vehicles',
                loadChildren: () => import('./features/vehicles/vehicles.routes').then(m => m.routes)
            },
            {
                path: 'reservations',
                loadChildren: () => import('./features/reservations/reservations.routes').then(m => m.routes)
            },
            {
                path: 'operators',
                loadChildren: () => import('./features/operators/operators.routes').then(m => m.routes),
                canActivate: [authGuard],
                data: { adminOnly: true }
            },
            {
                path: 'payments',
                loadChildren: () => import('./features/payments/payments.routes').then(m => m.routes)
            },
            {
                path: 'reports',
                loadChildren: () => import('./features/reports/reports.routes').then(m => m.routes)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
