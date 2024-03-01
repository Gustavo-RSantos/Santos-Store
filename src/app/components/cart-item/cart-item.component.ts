import { Component, Input } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { round } from 'mathjs'

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    NgFor,
  ],
  templateUrl:'./cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  round = round

  private _cart: Cart = { items: [] };
  itemsQuatity = 0;

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart){
    this._cart = cart;

    this.itemsQuatity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0);

      console.log(cart)
  }

  constructor(private cartService: CartService) { }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }


  onClearCart(){
    this.cartService.clearCart();
  }
  ngOnInit(): void {

  }
}
