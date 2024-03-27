import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products$: Observable<Product[]> | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.listAllProducts();
  }

  listAllProducts() {
    this.products$ = this.productService.getProductListFromBackend();
  }

}
