import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { PRODUCTS } from '../../../server/db-data';

describe('ProductService', () => {
  let service: ProductService, httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all Products', () => {
    service.getProductByCategory().subscribe((products) => {
      expect(products).withContext('No products returned').toBeTruthy();

      expect(products.length)
        .withContext('incorrect number of products')
        .toBe(5);

      const product = products.find((product) => product.id == 2);
      expect(product?.sku).toBe('BOOK-TECH-1001');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:8080/api/products'
    );
    expect(req.request.method).toEqual('GET');
    req.flush({
      _embedded: {
        products: Object.values(PRODUCTS),
      },
    });
  });
});
