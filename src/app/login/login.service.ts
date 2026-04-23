import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  // ================= AUTH STATE =================
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private _user = new BehaviorSubject<User>(this.getSafeUser());
  user$ = this._user.asObservable();

  constructor(private http: HttpClient) {}

  // ================= SAFE STORAGE =================
  private getSafeUser(): User {
    const stored = sessionStorage.getItem('user');
    if (!stored || stored === 'undefined') return {};

    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  // ================= LOGIN =================
  // login(values: any): Observable<any> {
  //   return this.http
  //     .post<any>(`${environment.apiBaseUrl}/auth/login`, values)
  //     .pipe(
  //       map((res) => {
  //         if (res?.token) {
  //           sessionStorage.setItem('token', res.token);
  //           sessionStorage.setItem('user', JSON.stringify(res.user));

  //           this._isLoggedIn.next(true);
  //           this._user.next(res.user);
  //         }
  //         return res;
  //       })
  //     );
  // }

  // ================= LOGOUT =================
  logout(): void {
    sessionStorage.clear();
    this._isLoggedIn.next(false);
    this._user.next({});
  }

  // ================= AUTH HEADERS =================
  getAuthHeaders() {
    const token = sessionStorage.getItem('token');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // ================= SYNCHRONOUS ACCESS =================
  isLoggedInSync(): boolean {
    return this._isLoggedIn.value;
  }

  getUserSync(): User {
    return this._user.value;
  }
}