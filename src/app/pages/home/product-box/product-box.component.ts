import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../models/products.model';
import { angularMath } from 'angular-ts-math/dist/angular-ts-math/angular-ts-math';
import { CommonModule } from '@angular/common';
import { round } from 'mathjs'

@Component({
  selector: 'app-product-box',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent implements OnInit {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();


  ngOnInit(): void {

  }
  angularMath = angularMath
  round = round

  onAddToCart(): void {
    this.addToCart.emit(this.product);
    //console.log(this.product)

  }


}
