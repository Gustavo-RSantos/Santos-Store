import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { CartItemComponent } from './components/cart-item/cart-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AppModule,
    CartItemComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FashionStore';

  cart: Cart = { items: [] };

  constructor( private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
}
