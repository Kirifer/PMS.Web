// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserRecord {
  id: number;
  name: string;
  email: string;
  position: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7012/users'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserRecord[]> {
    return this.http.get<UserRecord[]>(this.apiUrl);
  }
}
