import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../core/services/base.service';
import { Tariff, VehicleType } from '../../../shared/models/models';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TariffService extends BaseService<Tariff> {
    protected endpoint = 'tariffs';

    constructor(http: HttpClient) {
        super(http);
    }

    getActiveByVehicleType(vehicleType: VehicleType): Observable<Tariff> {
        return this.http.get<Tariff>(`${this.baseUrl}/${this.endpoint}/active/${vehicleType}`);
    }

    activate(id: string): Observable<Tariff> {
        return this.http.patch<Tariff>(`${this.baseUrl}/${this.endpoint}/${id}/activate`, {});
    }

    deactivate(id: string): Observable<Tariff> {
        return this.http.patch<Tariff>(`${this.baseUrl}/${this.endpoint}/${id}/deactivate`, {});
    }
}
