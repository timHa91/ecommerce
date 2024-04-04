import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { GetResponseProducts } from '../interfaces/get-response-products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrlProducts;

  productListHasChanged$ = new BehaviorSubject<Observable<Product[]> | null>(
    null
  );

  constructor(private http: HttpClient) {}

  getAllProducts() {
    const requestUrl = this.baseUrl + '?size=100';
    this.productListHasChanged$.next(
      this.http
        .get<GetResponseProducts>(requestUrl)
        .pipe(map((response) => response._embedded.products))
    );
  }

  getProductByCategory(categoryId: number) {
    const requestUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    this.productListHasChanged$.next(
      this.http
        .get<GetResponseProducts>(requestUrl)
        .pipe(map((response) => response._embedded.products))
    );
  }

  findProductsByName(name: string) {
    const requestUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}`;
    this.productListHasChanged$.next(
      this.http
        .get<GetResponseProducts>(requestUrl)
        .pipe(map((response) => response._embedded.products))
    );
  }
}
