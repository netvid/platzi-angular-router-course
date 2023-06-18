import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { BehaviorSubject, Observable, switchMap, tap, zip} from 'rxjs';
import { User } from '../models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.API_URL}/api/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public login(email: string, password: string): Observable<Auth>{
    return this.http.post<Auth>(`${this.baseUrl}/login`, {email, password})
    .pipe(
      tap((res) => this.tokenService.saveToken(res.access_token))
    );
  }

  public profile(){
    return this.http.get<User>(`${this.baseUrl}/profile`)
    // Send the user to the global
    .pipe(
      tap((user) => this.user.next(user))
    );
  }

  fetchLoginAndProfile(email: string, password: string){
    return this.login(email, password).pipe(
      switchMap(() => this.profile())
    )
  }

  public logout(){
    this.tokenService.removeToken();
  }
}
