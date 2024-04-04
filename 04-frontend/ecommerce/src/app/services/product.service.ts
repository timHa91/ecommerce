import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/productCategory';
import { environment } from '../../environments/environment';

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.baseUrlProducts;

  constructor(private http: HttpClient) { }

  getProductListFromBackend(categoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.http.get<GetResponseProducts>(searchUrl)
          .pipe(
            map(response => {
              console.log(response);
              
              return response._embedded.products}));
  }

}