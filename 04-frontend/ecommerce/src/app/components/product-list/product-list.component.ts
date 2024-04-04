import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
 selector: 'app-product-list',
 templateUrl: './product-list-grid.component.html',
 styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 products$: Observable<Product[]> | null = null;

 constructor(private productService: ProductService,
              private route: ActivatedRoute) {}

 ngOnInit(): void {
    // Everytime the category param changes it fetches products based on the category
    this.products$ = this.route.paramMap.pipe(
      switchMap(params => {
        const categoryId = params.get('id') || '1';
        return this.productService.getProductListFromBackend(+categoryId);
      })
    );
 }
}
