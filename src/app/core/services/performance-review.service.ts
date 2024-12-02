import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environments/environment';
import { PerformanceRecord } from '../models/performance.interface';

@Injectable({
  providedIn: 'root',
})
export class PerformanceReviewService {
  private performanceUrl = `${environment.apiUrl}/performance-reviews`;

  constructor(private http: HttpClient) {}

  fetchPerformanceReview(): Observable<PerformanceRecord> {
    return this.http.get<PerformanceRecord>(this.performanceUrl);
  }

  addRecord(payload: any): Observable<any> {
    return this.http.post(this.performanceUrl, payload);
  }

  deleteRecord(id: string): Observable<PerformanceRecord> {
    return this.http.delete<PerformanceRecord>(`${this.performanceUrl}/${id}`);
  }

  fetchPerformanceReviewById(id: string): Observable<any> {
    return this.http.get(`${this.performanceUrl}/${id}`);
  }

  updatePerformanceReview(id: string, data: any): Observable<any> {
    return this.http.put(`${this.performanceUrl}/${id}`, data);
  }
}
