import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T> {
    protected readonly baseUrl = 'http://localhost:8080';
    protected abstract endpoint: string;

    constructor(protected http: HttpClient) { }

    getAll(params?: any): Observable<T[]> {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key]);
                }
            });
        }
        return this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`, { params: httpParams });
    }

    getById(id: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`);
    }

    create(item: T): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, item);
    }

    update(id: string, item: T): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, item);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${this.endpoint}/${id}`);
    }
}
