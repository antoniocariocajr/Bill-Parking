import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getStats(): Observable<DashboardStats> {
        return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`);
    }

    getRecentActivity(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/dashboard/recent-activity`);
    }
}
