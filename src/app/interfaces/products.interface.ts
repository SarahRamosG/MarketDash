export interface IProducts {
    code: number;
    initialValue?: number;
    nombre: string;
    precio: number;
    ruta: string;
  }

  export interface IFactura{

    fecha?: Date;
    initialValue?: number;
    nombre: string;
    precio: number;
    total : number;
    
    
  }