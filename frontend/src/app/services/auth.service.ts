import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private token: string | null = null;
  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loggedIn.next(true); // User is authenticated
    }
  }

  setToken(token: string | null): void {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token); // Store the token in localStorage
    } else {
      localStorage.removeItem('token'); // Remove the token from localStorage
    }
  }

  getToken(): string | null {
    return this.token;
  }

  register(userData: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  login(userData: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, userData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.loggedIn.next(true);
          this.setToken(response.token); // Store the token in localStorage
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    this.setToken(null); // Remove the token from localStorage
    // Add any other logout-related logic (e.g., clearing user data, etc.) here.
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
