import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  paramsChangedSubscription: Subscription | null = null;
  productListHasChangedSubscription: Subscription | null = null;
  paginationSubscription: Subscription | null = null;
  page: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  searchType: 'category' | 'search' | 'all' = 'all';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initProductList();
    this.subscribeToProductListHasChanged();
    this.subscribeToPagination();
    this.subscribeToParamsChanged();
  }

  private initProductList() {
    this.handleAllProducts();
  }

  private subscribeToParamsChanged() {
    // Everytime the category param changes it fetches products based on the category
    this.paramsChangedSubscription = this.route.paramMap.subscribe((params) => {
      this.resetPagination();
      if (params.has('id')) {
        this.handleListProducts(params);
      } else if (params.has('keyword')) {
        this.handleSearchProducts(params);
      }
    });
  }

  private subscribeToPagination() {
    this.paginationSubscription = this.productService.pagination$.subscribe(
      (page) => {
        this.page = page.number + 1;
        this.pageSize = page.size;
        this.totalElements = page.totalElements;
      }
    );
  }

  private handleListProducts(params: ParamMap) {
    this.searchType = 'category';
    const categoryId = params.get('id') || '1';
    this.productService.getProductByCategory(
      +categoryId,
      this.page - 1,
      this.pageSize
    );
  }

  private handleSearchProducts(params: ParamMap) {
    this.searchType = 'search';
    const searchName = params.get('keyword') || '';
    this.productService.findProductsByName(
      searchName,
      this.page - 1,
      this.pageSize
    );
  }

  private handleAllProducts() {
    this.searchType = 'all';
    this.productService.getAllProducts(this.page - 1, this.pageSize);
  }

  private subscribeToProductListHasChanged() {
    this.productListHasChangedSubscription =
      this.productService.productListHasChanged$.subscribe((productList) => {
        this.products = productList;
      });
  }

  private unsubscribeAll() {
    this.paramsChangedSubscription?.unsubscribe();
    this.productListHasChangedSubscription?.unsubscribe();
    this.paginationSubscription?.unsubscribe();
  }

  private resetPagination() {
    this.page = 1;
    this.pageSize = 10;
  }

  handlePageChange() {
    if (this.searchType === 'category') {
      this.handleListProducts(this.route.snapshot.paramMap);
    } else if (this.searchType === 'search') {
      this.handleSearchProducts(this.route.snapshot.paramMap);
    } else if (this.searchType === 'all') {
      this.handleAllProducts();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
