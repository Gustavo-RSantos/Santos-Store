import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { CartService } from './services/cart.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    ProductsService,
    CartService
  ]
})
export class AppModule { }
