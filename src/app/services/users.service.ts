import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateUserDTO, User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.API_URL}/api/users`

  constructor(private http: HttpClient) { }


  public getAll(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }

  public create(dto: CreateUserDTO): Observable<User>{
    return this.http.post<User>(this.baseUrl,dto);
  }
}
