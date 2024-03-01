import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Product } from '../models/products.model';
import { Cart } from '../models/cart.model';


const  baseUrl = "https://fakestoreapi.com";
@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(limit = '20', sort = 'desc', category?: string ): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `${baseUrl}/products${
        category ? '/category/' + category: ''
      }?sort=${sort}&limit=${limit}`
      )
  }

  getAllCategories(): Observable<Array<string>> {
    return this.http.get<Array<string>>(
      `${baseUrl}/products/categories?`
    )
  }

 }
