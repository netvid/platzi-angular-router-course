import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { CreateProductDTO, Product, UpdateProductDTO } from './../models/product.model';
import { Observable, catchError, map, retry, throwError , zip, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getProductsByCategory(categoryId: string, limit?: number, offset?: number){
    let params = new HttpParams();
    if(limit !== undefined && offset !== undefined){
      params = params.set('limit', limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/categories/${categoryId}/products`, {params});
  }

  getAllProducts(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if(limit != undefined && offset != undefined){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.http.get<Product[]>(`${this.baseUrl}/products`, {params: params, context: checkTime()}).pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: item.price * 2
        }
      }))
    )
  }

  /**
   * Execute various requests at the same time
   * @param id number representing the id of the product
   * @param dto object representing the updateproduct dto to update
   * @returns a array with the responses
   */
  fetchReadAndUpdateZip(id: string, dto: UpdateProductDTO){
    return zip(
      this.getById(id),
      this.update(id,dto)
    )
  }

  /**
   * Execute the request one after of other avoiding the callback hell
   * @param id number representing the id of the product to read
   * @param dto object representing the updateProductDTO to update
   */
  fetchReadAndUpdate(id: string, dto: UpdateProductDTO){
    this.getById(id).pipe(
      switchMap((product) => this.update(product.id, dto))
      /*
      It can be used to create multiple requests one after to other
      switchMap((product) => this.update(product.id, dto))
      switchMap((product) => this.update(product.id, dto))
      switchMap((product) => this.update(product.id, dto))
      */
    )
  }

  getById(id: string): Observable<Product>{
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  create(dto: CreateProductDTO){
    return this.http.post<Product>(`${this.baseUrl}/products`,dto);
  }

  update(id: string, dto: UpdateProductDTO){
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`,dto);
  }

  delete(id: string){
    return this.http.delete<boolean>(`${this.baseUrl}/products/${id}`);
  }


  errorHandler(error: HttpErrorResponse): Observable<never>{
    switch (error.status) {
      case 404:
        return throwError(() => new Error('Product not found'));
        break;
      default:
        return throwError(() => new Error('Error'));
    }
  }
}
