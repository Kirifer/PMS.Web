import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environments/environment';
import { PerformanceRecord } from '../models/performance.interface';

@Injectable({
  providedIn: 'root',
})
export class LookUpService {
  private lookUpUrl = `${environment.apiUrl}/lookup`;

  constructor(private http: HttpClient) {}

  fetchCompetencies(): Observable<any> {
    return this.http.get<any>(this.lookUpUrl + '/competencies');

  }
  fetchSupervisors(): Observable<any> {
    return this.http.get<any>(this.lookUpUrl + '/supervisors');
  }
  fetchUsers(): Observable<any> {
    return this.http.get<any>(this.lookUpUrl + '/users');
  }
}
