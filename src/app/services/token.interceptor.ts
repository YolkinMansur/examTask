import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean | any;
  private accessTokenSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.localStorageService.getItem('token');

    return next.handle(this.addAuthorizationHeader(req, accessToken)).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          const refreshToken = this.localStorageService.getItem('refreshToken');

          if (refreshToken && accessToken) {
            return this.refreshToken(req, next);
          }

          return this.logoutAndRedirect(err);
        }

        if (err instanceof HttpErrorResponse && err.status === 403) {
          return this.logoutAndRedirect(err);
        }
        return throwError(err);
      })
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    if (token) {
      return request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return request;
  }

  private logoutAndRedirect(
    err: HttpErrorResponse
  ): Observable<HttpEvent<any>> {
    this.authService.logout();
    this.router.navigateByUrl('/login');

    return throwError(err);
  }

  private refreshToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next('');

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(res.accessToken);

          return next.handle(
            this.addAuthorizationHeader(request, res.accessToken)
          );
        })
      );
    } else {
      return this.accessTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addAuthorizationHeader(request, token));
        })
      );
    }
  }
}
