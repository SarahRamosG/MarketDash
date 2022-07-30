import { Component, OnInit } from '@angular/core';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { CarritoPage } from '../carrito/carrito.page';
import { BasedatosService } from '../services/basedatos.service';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})

export class EscanerPage implements OnInit {

   code: any;
   //carrito
   cart = [];
   products = [];
   cartItemCount: BehaviorSubject<number>;
   itemWasScaned = false;

  constructor(private barcodeScanner: BarcodeScanner, private cartService: CartService, private modaCtrl: ModalController, private  dataservice: BasedatosService) {
    this.inicializar();
  }

  inicializar(){
    this.dataservice.getDocument("producto").subscribe(data=> this.products.push(...data));
  
  }

//carrito
  ngOnInit() {
    this.products = this.cartService.getProducts ();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount ();

  }

  addToCart(product){
 this.cartService.addProduct(product);
  }

  async openCart(){

    const modal = await this.modaCtrl.create({
      component : CarritoPage,
      cssClass: 'carrito'
    });
    modal.present();


  }

  //SCANER
     scan(){
      this.barcodeScanner.scan().then(barcodeData =>{
        this.products = this.products.filter(products => products.barcode == String(barcodeData.text));
        //Operador ternario
        this.itemWasScaned = this.products.length ? true : false;
        console.log('Producto', this.products);
      }).catch(err=>{
        console.log('Error',err);
      });

      }

      }

