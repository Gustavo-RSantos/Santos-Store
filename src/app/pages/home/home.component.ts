import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/products.model';
import { ProductBoxComponent } from './product-box/product-box.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Cart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ProductBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {


category: string | undefined;
products: Array<Product> | undefined;
productsSubcription: Subscription | undefined;
sort = 'desc';
count = '20';

cartObj: Array<Cart> | undefined


  constructor(private productService: ProductsService,
  private cartService: CartService) { }

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.productsSubcription = this.productService.getAllProducts(this.count, this.sort, this.category).subscribe((_products) => {
      this.products = _products;
    })

    console.log(this.products)
  }

  onShowCategory(newCategory: string): void{
    this.category = newCategory;
    this.loadAllProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      image: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.loadAllProducts()
  }

    ngOnDestroy(): void {
      if (this.productsSubcription) {
        this.productsSubcription.unsubscribe();
    }
  }

    // addItemToCart() {
    //   this.productService.addToCart(this.cartObj).subscribe((result: any) => {
    //     this.products = result.data
    //   })
    // }

}
