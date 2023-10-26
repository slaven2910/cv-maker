import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(userData: { username: string, password: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(userData: { username: string, password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, userData);
  }
  
}
