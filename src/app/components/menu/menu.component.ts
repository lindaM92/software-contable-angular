import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/autenticacion/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private authService: AuthService) {}

  cerrarSesion(): void {
    this.authService.cerrarSesion();
  }

  estado() {
    this.authService.cambiarContrasena({
      contrasenaAnterior: '123456',
      nvaContrasena: '123456',
    });
  }
}
