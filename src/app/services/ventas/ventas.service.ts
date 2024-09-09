import { Injectable } from '@angular/core';
import { IProducto } from '../../models/producto.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import {
  IInventario,
  IInventarioResponse,
} from '../../models/inventario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private angularFireStore: AngularFirestore) {}

  registroProducto(producto: IProducto): void {
    this.angularFireStore
      .collection('productos')
      .add(producto)
      .then(() => {
        const date = new Date(); // Fecha actual
        const formattedDate = date.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        this.AgregarProdInventario({
          ...producto,
          costo: null,
          cantidad: 0,
          fechaCreacion: formattedDate,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error en el servidor',
          text: error,
        });
      });
  }

  AgregarProdInventario(prodInventario: IInventario): void {
    this.angularFireStore
      .collection('inventario')
      .add(prodInventario)
      .then(() => {
        Swal.fire({
          title: 'BIEN',
          text: 'Producto creado satisfactoriamente',
          icon: 'success',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error en el servidor',
          text: error,
        });
      });
  }

  //trayendo la información de todos los productos existentes en el inventario

  obtenerInventario(): Observable<any> {
    return this.angularFireStore
      .collection<IInventario>('inventario')
      .snapshotChanges();
  }

  actualizarProducto(producto: IInventarioResponse): void {
    const { id, ...productoMap } = producto;

    this.angularFireStore
      .collection('inventario')
      .doc(producto.id)
      .update(productoMap)
      .then(() => {
        Swal.fire({
          title: 'Actualizado',
          text: 'Producto actualizado satisfactoriamente',
          icon: 'success',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar',
          text: error.message,
        });
      });
  }
}
