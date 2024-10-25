import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IUserData } from '../../models/entities/userData'; 
import { Employee } from '../../models/class/employee';
import { ResponseModel } from '../../models/entities/response';

@Injectable({
  providedIn: 'root'
})
export class PerformanceReviewService {
  private performanceUrl = `${environment.API_URL}/performance-reviews`;
  
  constructor(private http: HttpClient) { }


  getAllEmployees (): Observable<ResponseModel> {
    return this.http.get<ResponseModel>(this.performanceUrl);
  }

  addEmployee(obj:Employee): Observable<ResponseModel> {
    return this.http.post<ResponseModel>(this.performanceUrl, obj); 
  } 
  
  deletePerformanceReview(id: string): Observable<ResponseModel> {  
    return this.http.delete<ResponseModel>(`${this.performanceUrl}/${id}`);
  }

}






  // getPerformanceReviewById(id: string): Observable<IUserData> { 
  //   return this.http.get<IUserData>(`${this.performanceUrl}/${id}`);
  // }

  // updatePerformanceReview(id: string, data: IUserData): Observable<IUserData> {  
  //   return this.http.put<IUserData>(`${this.performanceUrl}/${id}`, data);
  // }

