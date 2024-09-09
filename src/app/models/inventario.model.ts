export interface IInventario {
  nombre: string;
  codigo: string;
  costo: string | null;
  cantidad: 0;
  fechaCreacion: string;
  observaciones: string | null;
}

export interface IInventarioResponse extends IInventario {
  id: string;
}
