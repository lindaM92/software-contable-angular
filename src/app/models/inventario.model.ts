export interface IInventario {
  nombre: string;
  codigo: string;
  costo: string | null;
  cantidad: number;
  fechaCreacion: string;
  observaciones: string | null;
}

export interface IInventarioResponse extends IInventario {
  id: string;
}
