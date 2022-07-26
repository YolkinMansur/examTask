import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';
import { __values } from 'tslib';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject('');

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(form: {
    username: string;
    password: string;
  }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment}/login`, form).pipe(
      tap((response) => {
        this.user$.next('');
        this.setToken('token', response.accessToken);
        this.setToken('refreshToken', response.refreshToken);
      })
    );
  }

  logout(): void {
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
    this.user$.next('');
  }

  getCurrentUser(): Observable<any> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return of(user);
        }

        const token = this.localStorageService.getItem('token');

        if (token) {
          return this.fetchCurrentUser();
        }

        return of(null);
      })
    );
  }

  fetchCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment}/current-user`).pipe(
      tap((user) => {
        return this.user$.next('');
      })
    );
  }

  refreshToken(): Observable<{ accessToken: string; refreshToken: string }> {
    const refreshToken = this.localStorageService.getItem('refreshToken');

    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${environment}/refresh-token`,
        {
          refreshToken,
        }
      )
      .pipe(
        tap((response) => {
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
      );
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
