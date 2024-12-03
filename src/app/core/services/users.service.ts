import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any> {
    return this.http.get<any>(this.usersUrl);
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
