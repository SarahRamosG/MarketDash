import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Products } from '../services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart = [];
  isModalOpen = false;

  constructor(private cartServices: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.cart = this.cartServices.getCart();
  }

  decreaseCartItem(product){
    this.cartServices.decreaseProduct(product);
  }

  increaseCartItem(product){
    this.cartServices.addProduct(product);

  }

  removeCartItem(product){
    this.cartServices.removeProduct(product);
  }

  getTotal(){
    return this.cart.reduce((i,j)=> i + j.precio * j.initialValue, 0);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  checkout(){

  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
