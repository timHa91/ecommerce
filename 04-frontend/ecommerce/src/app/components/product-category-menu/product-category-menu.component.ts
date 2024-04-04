import { Component, OnInit } from '@angular/core';
import { ProductCategoryService } from '../../services/product-category.service';
import { Observable } from 'rxjs';
import { ProductCategory } from '../../models/productCategory';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories$: Observable<ProductCategory[]> | null = null;

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.productCategories$ =
      this.productCategoryService.getProductCategoriesFromBackend();
  }
}
