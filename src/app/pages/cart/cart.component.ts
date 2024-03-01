import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { angularMath } from 'angular-ts-math/dist/angular-ts-math/angular-ts-math';
import { round } from 'mathjs'
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  angularMath = angularMath
  round = round

  cart: Cart = { items: [
    {
      product: 'https://via.placeholder.com/150' ,
      image: 'https://via.placeholder.com/150',
      name: 'snikers',
      price: 150 ,
      quantity: 3,
      id: 1,
    },
    {
      product: 'https://via.placeholder.com/150' ,
      image: 'https://via.placeholder.com/150',
      name: 'snikers',
      price: 150 ,
      quantity: 5,
      id: 2,
    }
  ] };

  dataSource: Array<CartItem> = []
  displayColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(
    private cartService: CartService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
      this.dataSource = this.cart.items;
      this.cartService.cart.subscribe((_cart: Cart) => {
        this.cart = _cart;
        this.dataSource = this.cart.items;
      })
  }


  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
  onRemoveFromCart(item: CartItem ): void {
    this.cartService.removeFromCart(item)
  }

  onAddQuatity(item: CartItem): void {
    this.cartService.addToCart(item)
  }
  onRemoveQuatity(item: CartItem): void {
    this.cartService.removeQuatity(item)
  }

   onCheckout(): void {
        this.http.post('http://localhost:4242/checkout', {
          items: this.cart.items
        }).subscribe(async(res: any) => {
          let stripe = await loadStripe("pk_test_51OZhPGKnLomOrQSHo58GNVhBsVsq8JULE2koY2YyCenrV4s8bedprk02sVudGcEXt1jSJwGBYFnhtysObcfn73uI00QEtxaFaw");
          stripe?.redirectToCheckout({
            sessionId: res.id
          })
        })
   }
}
