import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class CrearVentaComponent implements OnInit, OnDestroy {
  precioVenta: number = 0;
  totalVenta: number = 0;
  productoSeleccionado!: IInventarioResponse;
  inventarioData!: IInventarioResponse[];
  inventarioSubs!: Subscription;
  ventaForm!: FormGroup;
  cantidad: number = 1;
  disabledButtons: boolean = true;
  disabledSubmit: boolean = true;

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

  ngOnDestroy(): void {
    this.inventarioSubs.unsubscribe();
  }

  calcularPrecioV(utilidad: number): void {
    const costo = Number(this.productoSeleccionado.costo);

    const procentajeProd = (costo * utilidad) / 100;
    this.precioVenta = costo + procentajeProd;

    this._calcularTotal();
  }

  seleccionarProducto(): void {
    console.log("producto seleccionado", this.productoSeleccionado);
    
    this.precioVenta = 0;
    if (this.disabledButtons === true) {
      this.disabledButtons = false;
    }
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
    this._calcularTotal();
  }

  disminuirCantidad(): void {
    if (this.cantidad <= 1) {
      this.cantidad = 1;
    } else {
      this.cantidad--;
    }

    this._calcularTotal();
  }

  limpiarCantidad(): void {
    this.cantidad = 1;
    this._calcularTotal();
  }

  crearVenta(): void {
    const currentProductUnits = Number(this.productoSeleccionado.cantidad);
    const newProductUnits = currentProductUnits - this.cantidad;
    this.ventasService.actualizarProducto({
      ...this.productoSeleccionado,
      cantidad: newProductUnits,
      observaciones: this.ventaForm.value.observaciones,
    });
  }
  private _iniciarFormulario(): void {
    this.ventaForm = this.fb.group({
      observaciones: [null],
    });
  }

  private _calcularTotal(): void {
    this.totalVenta = this.precioVenta * this.cantidad;
  }
}
