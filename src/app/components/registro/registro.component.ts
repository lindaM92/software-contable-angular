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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  enviarFormulario: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this._iniciarFormulario();
  }

  async registrarUsuario() {
    this.enviarFormulario = true;
    if (this.registroForm.valid) {
      await this.authService.registrarUsuario(this.registroForm.value);
    }
  }

  private _iniciarFormulario(): void {
    this.registroForm = this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      contacto: [null, [Validators.required]],
      nacimiento: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, [Validators.required]],
      confirmarContrasena: [null, [Validators.required]],
    });
  }

  validarFormulario(): boolean {
    return this.enviarFormulario && this.registroForm.invalid;
  }
}
