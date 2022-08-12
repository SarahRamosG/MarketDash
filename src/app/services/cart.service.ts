import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { producto } from '../models/interfaces';
import { BasedatosService } from '../services/basedatos.service';
import {map} from 'rxjs/operators';
import { IProducts } from './../interfaces/products.interface';

export interface Products{
  id: number;
  name: string;
  price: number;
  amount: number;
  barcode: string;
  imgURL: string;
}


@Injectable({
  providedIn: 'root'
})
export class CartService {
   public superMarkets:any []= [];
  private cart = [];
  private cartItemCount = new BehaviorSubject (0);
  private data = [];

  constructor(private dataservice: BasedatosService) { }

     getProducts(){
      return this.dataservice.getDocument('producto')
      .pipe(map((response) => response.map((product: IProducts) => {
          const data: IProducts = Object.assign(product, {initialValue: 1});
          return data;
        })))
   
    }

    getCart(){
      return this.cart;
    }

   getCartItemCount(){
    return this.cartItemCount;
   }

   addProduct(product){
    let added = false;
    for (const p of this.cart){
      if (p.code === product.code){
        p.initialValue+=1;
        added = true;
        break;
      }
    }
    if(!added){
      this.cart.push(product);
    }
    this.cartItemCount.next (this.cartItemCount.value + 1);
   }

   decreaseProduct(product){
   for (const[index, p] of this.cart.entries()){
    if (p.code === product.code){
       p.initialValue-=1;
      if (p.initialValue === 0){
      this.cart.splice(index, 1);
    }
  }
}
  this.cartItemCount.next(this.cartItemCount.value - 1);

   }

   removeProduct(product){
    for (const [index, p] of this.cart.entries()){
      if (p.code === product.code){
        this.cartItemCount.next(this.cartItemCount.value - p.initialValue);
        this.cart.splice(index, 1);
      }
    }

   }
}
