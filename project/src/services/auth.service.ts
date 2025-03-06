import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserType } from '../types/userTypes';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private userApiUrl = 'http://localhost:3000/api/users';

  private currentUserSubject = new BehaviorSubject<UserType>(new UserType(-1, '', '', '', ''));
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: { token: string }) => {
        if (typeof window !== 'undefined' && window.sessionStorage) { 
          sessionStorage.setItem('token', response.token); 
          this.loadUserFromToken(); 
        } else {
          console.warn('sessionStorage is not available during login');
        }
      })
    );
  }

  register(name: string, email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, role });
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) { 
      sessionStorage.removeItem('token'); 
      this.currentUserSubject.next(new UserType(-1, '', '', '', ''));
    } else {
      console.warn('sessionStorage is not available during logout');
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !!sessionStorage.getItem('token');
    }
    return false;
  }

  getById(id: number) {
    this.http.get<UserType>(`${this.userApiUrl}/${id}`)
      .subscribe(user => {
        this.currentUserSubject.next(user);
        console.log('Updated user:', user);
      });
  }

  getUserById(id: number): Observable<UserType> {
    return this.http.get<UserType>(`${this.userApiUrl}/${id}`);
  }

  loadUserFromToken() {
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          console.log(decodedToken);
          this.getById(decodedToken.userId);
        } catch (error) {
          console.error('Error occurred during decoding token:', error);
        }
      }
    } else {
      console.log('sessionStorage is not available in this environment.');
    }
  }

  isAdminTeacher() {
    return this.currentUserSubject.value.role === 'admin' || this.currentUserSubject.value.role === 'teacher';
  }
}

