import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService, Products } from '../services/cart.service';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart = [];
  isModalOpen = false;
  date : Date = new Date ();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;


  constructor(private cartServices: CartService, private modalCtrl: ModalController) { }

  ngOnInit() {

    this.cart = this.cartServices.getCart();
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
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
