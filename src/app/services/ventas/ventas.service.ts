import { Injectable } from '@angular/core';
import { IProducto } from '../../models/producto.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  constructor(private angularFireStore: AngularFirestore) {}

  registroProducto(producto: IProducto): void {
    this.angularFireStore
      .collection('productos')
      .add(producto)
      .then((response) => {
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
}
