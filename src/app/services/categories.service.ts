import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl = `${environment.API_URL}/api/categories`;

  constructor(private http: HttpClient) { }

  public getAll(limit?: number, offset?: number): Observable<Category[]>{
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }

    return this.http.get<Category[]>(`${this.baseUrl}`, {params});
  }

}
