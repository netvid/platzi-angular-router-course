import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);

    return next.handle(request);
  }

  /**
   * Add a token to the request if exists a token in the localStorage using the tokenService
   * @param request Object HttpRequest type that it is the request send by the user
   * @returns a request with the token throw the header or no
   */
  public addToken(request: HttpRequest<unknown>){
    const token = this.tokenService.getToken();
    if(token){
      return request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`,
          'Content-type': 'application/json'
        }
      })
    }
    return request;
  }
}
