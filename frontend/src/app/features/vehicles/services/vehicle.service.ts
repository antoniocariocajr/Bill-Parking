import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../core/services/base.service';
import { Vehicle } from '../../../shared/models/models';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle> {
    protected endpoint = 'vehicles';

    constructor(http: HttpClient) {
        super(http);
    }

    override getAll(params?: any): Observable<Vehicle[]> {
        return super.getAll(params).pipe(
            map((response: any) => response.content || response)
        );
    }

    searchByLicensePlate(licensePlate: string): Observable<Vehicle> {
        return this.http.get<Vehicle>(`${this.baseUrl}/${this.endpoint}/license-plate/${licensePlate}`);
    }

    getByClientId(clientId: string): Observable<Vehicle[]> {
        return this.http.get<Vehicle[]>(`${this.baseUrl}/${this.endpoint}/client/${clientId}`);
    }
}
