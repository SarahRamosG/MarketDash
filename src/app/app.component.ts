import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Clientes', url: 'clientes', icon: 'person' },
    { title: 'Supermercados', url: 'supermercados', icon: 'cart' },
    { title: 'Pagos', url: 'pagos', icon: 'card' },
    { title: 'Salir', url: 'bienvenido', icon: 'log-out' },
  ];
 
  constructor() {}
}
