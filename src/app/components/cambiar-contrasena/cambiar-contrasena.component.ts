import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/autenticacion/auth.service';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent implements OnInit{
  cambioContrasenaForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService ) {}

  ngOnInit(): void {
    this._iniciarFormulario();
  }
  ok() {
    Swal.fire(
      '"El cambio de contraseña se realizo satisfactoriamente"'
    );
  }

  cambioContrasena() : void {
    this.authService.cambiarContrasena(this.cambioContrasenaForm.value)
  }
  private _iniciarFormulario(): void {
    this.cambioContrasenaForm = this.fb.group({
      contrasenaAnterior: [null, [Validators.required]],
      nvaContrasena: [null, [Validators.required]],
  
    });
  }
  

}
