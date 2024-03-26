import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

interface GetResponse {
  _embedded: {
    products: Product[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products'

  constructor(private http: HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<GetResponse>(this.baseUrl)
    .pipe(map(response => response._embedded.products));
  }
}