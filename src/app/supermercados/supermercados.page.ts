import { Component, OnInit } from '@angular/core';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-supermercados',
  templateUrl: './supermercados.page.html',
  styleUrls: ['./supermercados.page.scss'],
})
export class SupermercadosPage implements OnInit {
  public superMarkets: any [];
  searchsupermarker: any;

  constructor() {
    this.inicializar();
  }


  inicializar(){
    this.superMarkets = [
      {
        name: 'Jumbo',
        description: `Somos un hipermercado perteneciente a Centro Cuesta Nacional, diseñado para satisfacer las necesidades, preferencias y gusto de nuestros clientes.`,
        imgURL:'assets/Jumbo.jpg'
      },
      {
        name: 'Nacional',
        description: 'Expertos en vender barato, estamos comprometidos contigo, entregandote los mejores productos a la mas alta calidad.',
        imgURL:'assets/nacional.jpg'
       
      },
      {
        name: 'Bravo',
        description: `Trabajamos 24 horas para ofercerte frutas y vegetales con menos de 8 horas de cosechados.
        Por esto somos los expertos.`,
        imgURL:'assets/bravo.png'
      },
      {
        name: 'La Sirena',
        description: `Nos apasiona entender las necesidades del cliente y ofrecerle soluciones con amabilidad y respeto.`,
        imgURL:'assets/sirena.jpg'
       
      }
    ];
  }

   //Metodo de buscar
   buscar(ev: any){

    this.inicializar();

    const val = ev.target.value;

    if (val && val.trim()!==''){
      this.superMarkets = this.superMarkets.filter ((item) => (item.name.toLowerCase().indexOf(val.toLowerCase())> - 1));
    }
  }

  ngOnInit() {
  }

}


