import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  constructor() {}

  setToken(token: string) {
    this.token = token;
    // Store token in localStorage for persistence
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    // Retrieve token from localStorage
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    // Check if token exists
    return this.getToken() !== null;
  }

  logout() {
    // Clear token from localStorage
    localStorage.removeItem('token');
    this.token = null;
  }
}
