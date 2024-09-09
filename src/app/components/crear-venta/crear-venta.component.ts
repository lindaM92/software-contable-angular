import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import {
  IInventario,
  IInventarioResponse,
} from '../../models/inventario.model';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VentasService } from '../../services/ventas/ventas.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-venta',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './crear-venta.component.html',
  styleUrl: './crear-venta.component.css',
})
export class CrearVentaComponent {
  precioVenta: number = 0;
  productoSeleccionado!: IInventarioResponse;
  inventarioData!: IInventarioResponse[];
  inventarioSubs!: Subscription;
  ventaForm!: FormGroup;
  cantidad: number = 0;

  constructor(private fb: FormBuilder, private ventasService: VentasService) {}

  ngOnInit(): void {
    this._iniciarFormulario();

    this.inventarioSubs = this.ventasService
      .obtenerInventario()
      .subscribe((valor) => {
        this.inventarioData = valor.map((valor: any) => {
          const documentData = valor.payload.doc.data() as IInventario;
          const id = valor.payload.doc.id;
          return { id, ...documentData };
        });
      });
  }

  calcularPrecioV(utilidad: number): void {
    const costo = Number(this.productoSeleccionado.costo);

    const procentajeProd = (costo * utilidad) / 100;
    this.precioVenta = costo + procentajeProd;
  }

  verProductoSeleccionado(): void {
    console.log('producto seleccionado', this.productoSeleccionado);
  }

  actualizarInventario(): void {
    this.ventasService.actualizarProducto({
      id: this.productoSeleccionado.id,
      ...this.ventaForm.value,
    });
  }

  aumentarCantidad(): void {
    console.log('aumentar');

    this.cantidad++;
  }

  disminuirCantidad(): void {
    if (this.cantidad <= 0) {
      this.cantidad = 0;
    } else {
      this.cantidad--;
    }
  }

  limpiarCantidad(): void {
    this.cantidad = 0;
  }

  private _iniciarFormulario(): void {
    this.ventaForm = this.fb.group({
      observaciones: [null],
    });
  }
}
