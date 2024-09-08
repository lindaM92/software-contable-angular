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
  selector: 'app-inventario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css',
})
export class inventarioComponent implements OnInit {
    invForm!: FormGroup;

  constructor(private fb: FormBuilder, private ventasService: VentasService) {}

  ngOnInit(): void {
    this._iniciarFormulario();
  }

  //llamando la función registroProducto() que se encuentra en el servicio ventasService
  //Se le envían los valores del formulario
  inventario () : void {
    this.ventasService.registroProducto(this.invForm.value)
  } 

  

  private _iniciarFormulario(): void {
    this.invForm = this.fb.group({
      nombre: [null, [Validators.required]],
      uniMedida: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      costo: [null, [Validators.required]],
      cantidad: [null, [Validators.required]],
      observaciones: [null],
    });
  }
}
