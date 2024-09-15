import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/autenticacion/auth.service';
import { VentasService } from '../../services/ventas/ventas.service';
import { Observable, Subscription } from 'rxjs';
import {
  IInventario,
  IInventarioResponse,
} from '../../models/inventario.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class InventarioComponent implements OnInit, OnDestroy {
  invForm!: FormGroup;
  inventarioData!: IInventarioResponse[];
  inventarioSubs!: Subscription;
  productoSeleccionado!: IInventarioResponse;

  constructor(private fb: FormBuilder, private ventasService: VentasService) {}

  ngOnInit(): void {
    this._iniciarFormulario();

    this.inventarioSubs = this.ventasService
      .obtenerInventario()
      .subscribe((valor) => {
        this.inventarioData = valor.map((valor: any) => {
          const documentData = valor.payload.doc.data() as IInventario; // Extrae los datos
          const id = valor.payload.doc.id; // Extrae el ID del documento
          return { id, ...documentData }; // Combina ID y datos del documento
        });
      });
  }

  ngOnDestroy(): void {
    this.inventarioSubs.unsubscribe();
  }

  actualizarInventario(): void {
    this.ventasService
      .actualizarProducto({
        id: this.productoSeleccionado.id,
        ...this.invForm.value,
      })
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

  seleccionarProducto(): void {
    const { nombre, codigo, costo, cantidad, fechaCreacion, observaciones } =
      this.productoSeleccionado;

    this.invForm.setValue({
      nombre,
      codigo,
      costo,
      cantidad,
      observaciones,
    });
  }

  private _iniciarFormulario(): void {
    this.invForm = this.fb.group({
      nombre: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      costo: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      observaciones: [null],
    });
  }
}
