export interface IVenta {
  nombreProducto: string;
  codigoProducto: string;
  cantidad: number;
  precioVenta: number;
  totalVenta: number;
  observaciones: string;
  fechaVenta: string;
}

export interface IVentaResponse extends IVenta {
  id: string;
}
