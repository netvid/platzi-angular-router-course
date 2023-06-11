import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';


const CHECK_TIME = new HttpContextToken(() => false);
export function checkTime(){
  return new HttpContext().set(CHECK_TIME,true);
}

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let time: number = performance.now();
    if(request.context.get(CHECK_TIME)){
      return next.handle(request).pipe(
        tap(() => {
          let timeTaken = performance.now() - time + ' ms';
          console.log(request.url, timeTaken);
        })
      );
    }
    return next.handle(request);
  }
}
