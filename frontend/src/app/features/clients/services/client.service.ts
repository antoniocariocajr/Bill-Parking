import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../core/services/base.service';
import { Client } from '../../../shared/models/models';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService extends BaseService<Client> {
    protected endpoint = 'clients';

    constructor(http: HttpClient) {
        super(http);
    }

    override getAll(params?: any): Observable<Client[]> {
        return super.getAll(params).pipe(
            map((response: any) => response.content || response)
        );
    }

    searchByCpf(cpf: string): Observable<Client> {
        return this.http.get<Client>(`${this.baseUrl}/${this.endpoint}/cpf/${cpf}`);
    }

    searchByEmail(email: string): Observable<Client> {
        return this.http.get<Client>(`${this.baseUrl}/${this.endpoint}/email/${email}`);
    }
}
