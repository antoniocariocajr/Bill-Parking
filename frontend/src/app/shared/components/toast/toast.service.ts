import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toasts$ = new BehaviorSubject<Toast[]>([]);
    private idCounter = 0;

    getToasts() {
        return this.toasts$.asObservable();
    }

    show(type: Toast['type'], message: string, duration = 5000): void {
        const toast: Toast = {
            id: this.idCounter++,
            type,
            message
        };

        const currentToasts = this.toasts$.value;
        this.toasts$.next([...currentToasts, toast]);

        if (duration > 0) {
            setTimeout(() => this.remove(toast.id), duration);
        }
    }

    success(message: string): void {
        this.show('success', message);
    }

    error(message: string): void {
        this.show('error', message);
    }

    warning(message: string): void {
        this.show('warning', message);
    }

    info(message: string): void {
        this.show('info', message);
    }

    remove(id: number): void {
        const currentToasts = this.toasts$.value;
        this.toasts$.next(currentToasts.filter(t => t.id !== id));
    }
}
