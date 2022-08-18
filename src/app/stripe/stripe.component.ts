import { Component, OnInit } from '@angular/core';
import {loadStripe, Stripe} from "@stripe/stripe-js";
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { CartService, Products } from '../services/cart.service';
import { CarritoPage } from '../carrito/carrito.page';
import { BasedatosService } from '../services/basedatos.service';
import { AppStoreService} from '../services/app-store.service';
import { TouchSequence } from 'selenium-webdriver';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss'],
})
export class StripeComponent implements OnInit {

  private stripe : Stripe;
  private mensaje = "";
  // cart = [];
   carrito : CarritoPage;
   private monto : number;
   cart = [];
   public factura1:any []= [];

  
  constructor( 
     public alertController: AlertController,  
     public ToastController: ToastController, 
     private cartServices: CartService,  
     private  dataservice: BasedatosService,
     private factura : AppStoreService,
     private router: Router) {
    
      }

 
  //Vamos a pasar la llame publica y cuando hagamos eso esperaremos una respuesta
  async ngOnInit() {

    this.inicializar();

    //this.monto  = parseInt(this.carrito.getTotal());
    this.monto = this.getTotal();
    this.stripe = await loadStripe('pk_test_51LWPFkAlAGmCEgYAhmZCFDNt2eCT8bEnoXCmogrMGTH4w8iYaXrqtxeFvpFtycziovqqSPgHDxI69yhkQBLB5VBg00dcOoVaQd');
   
    const elements = this.stripe.elements();
    const card = elements.create ('card');
    card.mount('#card');

  // cuando la tarjeta cambie se producira un evento
    card.on('change', async (event)=>{
      const displayError = document.getElementById('card-errors');
      this.mensaje= event.error ? displayError.textContent = event.error.message: displayError.textContent = '';  
      
     /*const toast = await this.ToastController.create({
        message: this.mensaje,
        duration: 2000
  
      });
  
      toast.present();*/
      });
      
      const button = document.getElementById('button');
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const ownerInfo = {
          owner: {name : 'codexmaker'},
          //el dice que un peso es igual a 100 centavos por eso lo multiplica por 100
          amount : 3000,
          //su documentacion pide que sea en minuscula
          currency: 'dop',
        };
        

        //creando un recurso
        try{
          const result = await this.stripe.createSource(card,ownerInfo);
          console.log(result);
        } catch (e){
          console.log(e.message);
          
      
        }
        
    
       
      })
      
  }
  async payment (){
    const alert = await this.alertController.create({
      message: "Gracias por realizar su compra por MarketDash",
      buttons: ['Aceptar']
    });
    await alert.present();
    this.router.navigate(['/supermercados']); 
    return;
  
  }


  getTotal(){
    return this.cart.reduce((i,j)=> i + j.precio * j.initialValue, 0);
  }

  inicializar( ){
    this.dataservice.getDocument("factura").subscribe(data=> this.factura1 = data);

  }
  }

