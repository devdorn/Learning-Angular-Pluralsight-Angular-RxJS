import { Component } from '@angular/core';
import { SupplierService } from 'src/app/suppliers/supplier.service';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent {
  constructor(private supplierService: SupplierService) {

  }
}
