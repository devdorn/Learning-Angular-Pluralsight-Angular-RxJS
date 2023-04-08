import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BehaviorSubject, EMPTY, Subject, catchError, combineLatest, map } from 'rxjs';

import { ProductService } from './product.service';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  pageTitle = 'Product List';
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  private subject = new BehaviorSubject(0);
  categorySelectedAction$ = this.subject.asObservable();

  categories$ = this.productCategoryService.productsCategories$
    .pipe(
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  products$ =
    combineLatest([
      this.categorySelectedAction$,
      this.productService.productsWithAdd$
    ])
      .pipe(
        map(([categoryId, products]) =>
          products.filter(product => categoryId ? product.categoryId === categoryId : true
          ))
      );

  constructor(private productService: ProductService, private productCategoryService: ProductCategoryService) { }

  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.subject.next(+categoryId);
  }
}
