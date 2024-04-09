import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';
import { GetResponseProducts } from '../interfaces/get-response-products';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrlProducts;
  pagination$ = new Subject<Page>();

  productListHasChanged$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getAllProducts(page?: number, pageSize?: number) {
    let requestUrl = this.baseUrl;
    // Check Pagination
    if (page !== undefined && pageSize !== undefined) {
      requestUrl += `?page=${page}&size=${pageSize}`;
    }

    this.http
      .get<GetResponseProducts>(requestUrl)
      .pipe(
        tap((response) => {
          this.productListHasChanged$.next(response._embedded.products);
          this.pagination$.next(response.page);
        })
      )
      .subscribe();
  }

  getProductById(id: number): Observable<Product> {
    const requestUrl = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(requestUrl);
  }

  getProductByCategory(categoryId: number, page?: number, pageSize?: number) {
    let requestUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    // Check Pagination
    if (page !== undefined && pageSize !== undefined) {
      requestUrl += `&page=${page}&size=${pageSize}`;
    }

    this.http
      .get<GetResponseProducts>(requestUrl)
      .pipe(
        tap((response) => {
          this.productListHasChanged$.next(response._embedded.products);
          this.pagination$.next(response.page);
        })
      )
      .subscribe();
  }

  findProductsByName(name: string, page?: number, pageSize?: number) {
    let requestUrl = `${this.baseUrl}/search/findByNameContaining?name=${name}`;
    // Check Pagination
    if (page !== undefined && pageSize !== undefined) {
      requestUrl += `&page=${page}&size=${pageSize}`;
    }
    this.http
      .get<GetResponseProducts>(requestUrl)
      .pipe(
        tap((response) => {
          this.productListHasChanged$.next(response._embedded.products);
          this.pagination$.next(response.page);
        })
      )
      .subscribe();
  }
}
