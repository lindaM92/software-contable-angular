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
export class InventarioComponent implements OnInit {
  invForm!: FormGroup;
  inventarioData!: IInventarioResponse[];
  productoSeleccionado!: IInventarioResponse;

  constructor(private fb: FormBuilder, private ventasService: VentasService) {}

  ngOnInit(): void {
    this._iniciarFormulario();

    this.ventasService.obtenerInventario().subscribe((valor) => {
      this.inventarioData = valor.map((valor: any) => {
        console.log('data sin filtrar ', valor); // Muestra toda la acción con payload, doc, y data()
        const documentData = valor.payload.doc.data() as IInventario; // Extrae los datos
        const id = valor.payload.doc.id; // Extrae el ID del documento
        return { id, ...documentData }; // Combina ID y datos del documento
      });

      console.log('valor inventario', this.inventarioData);
    });
  }

  //llamando la función registroProducto() que se encuentra en el servicio ventasService
  //Se le envían los valores del formulario
  inventario(): void {
    this.ventasService.registroProducto(this.invForm.value);
  }

  seleccionarProducto(producto: Event): void {
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
