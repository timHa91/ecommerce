import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product> | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.getProductIdFromRoute();
    this.product$ = this.getProductWithId(id);
  }

  private getProductIdFromRoute(): number {
    return +this.route.snapshot.params['id'];
  }

  private getProductWithId(id: number): Observable<Product> {
    return this.productService.getProductById(id);
  }
}
