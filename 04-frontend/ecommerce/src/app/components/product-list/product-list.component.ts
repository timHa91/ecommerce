import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]> | null = null;
  paramsChangedSubscription: Subscription | null = null;
  productListHasChangedSubscription: Subscription | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initProductList();
    this.subscribeToProductListHasChanged();
    this.subscribeToParamsChanged();
  }

  private initProductList() {
    this.productService.getAllProducts();
  }

  private subscribeToParamsChanged() {
    // Everytime the category param changes it fetches products based on the category
    this.paramsChangedSubscription = this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.handleListProducts(params);
      } else if (params.has('keyword')) {
        this.handleSearchProducts(params);
      }
    });
  }

  private handleListProducts(params: ParamMap) {
    const categoryId = params.get('id') || '1';
    this.productService.getProductByCategory(+categoryId);
  }

  private handleSearchProducts(params: ParamMap) {
    const searchName = params.get('keyword') || '';
    this.productService.findProductsByName(searchName);
  }

  private subscribeToProductListHasChanged() {
    this.productListHasChangedSubscription =
      this.productService.productListHasChanged$.subscribe((productList) => {
        this.products$ = productList;
      });
  }

  private unsubscribeAll() {
    this.paramsChangedSubscription?.unsubscribe();
    this.productListHasChangedSubscription?.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
