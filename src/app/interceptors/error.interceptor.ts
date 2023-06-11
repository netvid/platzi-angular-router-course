import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        return this.errorHandler(err);
      })
    );
  }

  private errorHandler(error: HttpErrorResponse){
    switch(error.status){
      case 404:
        return throwError(() => new Error('Not found'));
        break;
      case 403:
        return throwError(() => new Error('Unathorized'));
        break;
      case 500:
        return throwError(() => new Error('Internal error'));
        break;
      default:
        return throwError(() => new Error('Unexpected error'));
        break;
    }

  }
}
