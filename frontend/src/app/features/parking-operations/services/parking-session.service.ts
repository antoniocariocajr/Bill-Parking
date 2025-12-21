import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSession, Vehicle, ParkingSpot } from '../../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class ParkingSessionService {
    private readonly baseUrl = 'http://localhost:8080';
    private readonly endpoint = 'parking-sessions';

    constructor(private http: HttpClient) { }

    getActiveSessions(): Observable<ParkingSession[]> {
        return this.http.get<ParkingSession[]>(`${this.baseUrl}/${this.endpoint}/active`);
    }

    getById(id: string): Observable<ParkingSession> {
        return this.http.get<ParkingSession>(`${this.baseUrl}/${this.endpoint}/${id}`);
    }

    registerEntry(vehicleId: string, spotId: string): Observable<ParkingSession> {
        return this.http.post<ParkingSession>(`${this.baseUrl}/${this.endpoint}/entry`, {
            vehicleId,
            spotId
        });
    }

    registerExit(sessionId: string, exitTime?: string): Observable<ParkingSession> {
        return this.http.post<ParkingSession>(`${this.baseUrl}/${this.endpoint}/${sessionId}/exit`, {
            exitTime: exitTime || new Date().toISOString()
        });
    }

    calculateAmount(sessionId: string): Observable<{ amount: number; duration: number }> {
        return this.http.get<{ amount: number; duration: number }>(
            `${this.baseUrl}/${this.endpoint}/${sessionId}/calculate`
        );
    }
}
