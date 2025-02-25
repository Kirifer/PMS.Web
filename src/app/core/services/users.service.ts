import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environments/environment';
import { BaseResponse } from '../models/user/user-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(this.usersUrl);
  }

  addUser(payload: any): Observable<any> {
    return this.http.post(this.usersUrl, payload);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.usersUrl}/${id}`);
  }

  fetchUserId(id: string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${id}`, data);
  }
}
