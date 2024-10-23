import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUserData } from '../../models/entities/userData'; 

@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {
  private prUrl = `${environment.apiUrl}/performance-reviews`;
  
  constructor(private http: HttpClient) { }


  getPerformanceReviews(): Observable<IUserData[]> {
    return this.http.get<IUserData[]>(this.prUrl);
  }
  
  getPerformanceReviewById(id: number): Observable<IUserData> {
    return this.http.get<IUserData>(`${this.prUrl}/${id}`);
  }

  addPerformanceReview(review: IUserData): Observable<IUserData> {
    return this.http.post<IUserData>(environment.apiUrl + '/performance-reviews/3fa85f64-5717-4562-b3fc-2c963f66afa6', review);
  }

  // submitPerformanceReview(payload: any): Observable<any> {
  //   return this.http.post(this.apiUrl, payload);
  // }

  updatePerformanceReview(id: number, review: IUserData): Observable<IUserData> {
    return this.http.put<IUserData>(`${this.prUrl}/${id}`, review);
  }

  deletePerformanceReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.prUrl}/${id}`);
  }
}
