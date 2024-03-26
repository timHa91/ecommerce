import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-table.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products$: Observable<Product[]> | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
      this.listProducts();
  }

  listProducts() {
    this.products$ = this.productService.getProductList();
  }

}
