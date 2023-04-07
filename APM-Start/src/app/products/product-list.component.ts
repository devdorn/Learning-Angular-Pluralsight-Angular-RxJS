import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject, EMPTY, catchError, combineLatest, filter, map } from 'rxjs';

import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';

  private subject = new BehaviorSubject(0);
  categorySelectedAction$ = this.subject.asObservable();

  categories$ = this.productCategoryService.productsCategories$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  products$ =
    combineLatest([this.categorySelectedAction$, this.productService.productsWithCategory$])
      .pipe(
        map(([categoryId, products]) =>
          products.filter(product => categoryId ? product.categoryId === categoryId : true
          ))
      );

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    this.subject.next(+categoryId);
  }
}
