import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; //importando la libreria para los modales
import { AuthService } from '../../services/autenticacion/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css',
})
export class InicioSesionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  // llamando la funcion antes de cargar el html
  ngOnInit(): void {
    this._iniciarFormulario();
  }

  recuperar() {
    Swal.fire(
      'Por favor revise su correo para la respectiva recuperación de clave.'
    );
  }

  iniciarSesion(): void {
    this.authService.loguearUsuario(this.loginForm.value);
  }

  private _iniciarFormulario(): void {
    this.loginForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, [Validators.required]],
    });
  }
}
