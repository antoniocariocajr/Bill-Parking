import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const token = authService.getToken();

    // Clone the request and add authorization header if token exists
    if (token && !req.url.includes('/auth/login')) {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    // Handle errors
    return next(req).pipe(
        catchError(error => {
            if (error.status === 401) {
                // Unauthorized - redirect to login
                authService.logout();
            }
            return throwError(() => error);
        })
    );
};
