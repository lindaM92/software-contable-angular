import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/autenticacion/auth.service';
import { VentasService } from '../../services/ventas/ventas.service';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css',
})
export class CrearProductoComponent implements OnInit {
  createProductForm!: FormGroup;

  constructor(private fb: FormBuilder, private ventasService: VentasService) {}

  ngOnInit(): void {
    this._iniciarFormulario();
  }

  //llamando la función registroProducto() que se encuentra en el servicio ventasService
  //Se le envían los valores del formulario
  crearProducto () : void {
    this.ventasService.registroProducto(this.createProductForm.value)
  } 

  

  private _iniciarFormulario(): void {
    this.createProductForm = this.fb.group({
      nombre: [null, [Validators.required]],
      uniMedida: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      costo: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      observaciones: [null],
    });
  }
}
