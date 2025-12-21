import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../../core/services/base.service';
import { ParkingSpot, VehicleType, SpotStatus } from '../../../shared/models/models';

@Injectable({
    providedIn: 'root'
})
export class ParkingSpotService extends BaseService<ParkingSpot> {
    protected endpoint = 'parking-spots';

    constructor(http: HttpClient) {
        super(http);
    }

    getAvailableSpots(vehicleType?: VehicleType): Observable<ParkingSpot[]> {
        const url = vehicleType
            ? `${this.baseUrl}/${this.endpoint}/available?type=${vehicleType}`
            : `${this.baseUrl}/${this.endpoint}/available`;
        return this.http.get<ParkingSpot[]>(url);
    }

    updateStatus(id: string, status: SpotStatus): Observable<ParkingSpot> {
        return this.http.patch<ParkingSpot>(`${this.baseUrl}/${this.endpoint}/${id}/status`, { status });
    }
}
