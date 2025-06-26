import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private userRole: 'admin' | 'employee' | null = null;

  login(username: string, password: string): boolean {
    // Simulate login logic
    if (username === 'admin@test.com') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
      return true;
    } else if (username) {
      this.isAuthenticated = true;
      this.userRole = 'employee';
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.userRole = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getRole(): 'admin' | 'employee' | null {
    return this.userRole;
  }
}