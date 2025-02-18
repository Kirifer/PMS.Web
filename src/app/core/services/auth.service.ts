import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;

  login(username: string, password: string): void {
    // Simulate login logic
    this.isAuthenticated = true;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}