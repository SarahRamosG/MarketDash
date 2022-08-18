import { StringifyOptions } from "querystring";

export interface clientes {

    nombre: string;
    email:string;
    contrasena:string;
    confirmarcontrasena:string;
    tarjeta:number;

}

export interface producto{
    nombre: string;
    precio: number;
    cantidad: number;
    code: number;
    ruta: string;
  }


  export interface factura{
    fecha: string;
    producto1:string;
    producto2:string;
    producto3:string;
    cantidad1: number;
    cantidad2:number;
    cantidad3:number;
    precio1:number;
    precio2:number;
    precio3:number;
    monto:number;


  }