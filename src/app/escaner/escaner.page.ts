import { Component, OnInit } from '@angular/core';
import { BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})

export class EscanerPage implements OnInit {

   code: any;
   //carrito
   cart = [];
   products =[];
   cartItemCount : BehaviorSubject<number>;


  constructor(private barcodeScanner: BarcodeScanner, private cartService:CartService, private modaCtrl: ModalController) { 
    this.inicializar();
  }

 

  inicializar(){
   data : this.products = [
      {
        name: 'Rexona',
        description: `100`,
        imgURL:'assets/rexona.png',
        barcode :'75062798'
      },
      {
        name: 'VapoRub',
        description: ` 150`,
        imgURL:'assets/vaporub.jpg',
        barcode: '7590002012468'
      },
      {
        name: 'Salsa de Tostito',
        description: `Precio : 200`,
        imgURL:'assets/salsa.PNG'
      }
    ];
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

    let modal = await this.modaCtrl.create({
      component : CarritoPage,
      cssClass: 'carrito'
    });
    modal.present();


  }

  /*FILTRO
  buscar(ev: any){

    this.inicializar();

    const val = ev.target.value;

    if (val && val.trim()!==''){
      this.products = this.products.filter ((item) => (item.name.toLowerCase().indexOf(val.toLowerCase())> - 1));
    }
  }
  */

  //SCANER
     scan(){
      this.barcodeScanner.scan().then(barcodeData =>{
        this.code  = this.products.filter(products => products.barcode === barcodeData.text)
        console.log('Barcode data', this.code);
      }).catch(err=>{
        console.log('Error',err);
      });

      }

    

     

      }
      
     
   
     

