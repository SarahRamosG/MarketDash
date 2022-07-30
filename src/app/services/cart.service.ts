import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  data: Products[] = [
    {id:1, name:'Rexona', price: 100, amount: 1, barcode: '75062798', imgURL:'assets/rexona.png'},

  ];

  private cart = [];
  private cartItemCount = new BehaviorSubject (0);


  constructor() { }

    getProducts(){
      return this.data;
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
      if (p.id === product.code){
        p.amount+=1;
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
    if (p.id === product.id){
       p.amount-=1;
      if (p.amount === 0){
      this.cart.splice(index, 1);
    }
  }
}
  this.cartItemCount.next(this.cartItemCount.value - 1);

   }

   removeProduct(product){
    for (const [index, p] of this.cart.entries()){
      if (p.id === product.id){
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }

   }
}
