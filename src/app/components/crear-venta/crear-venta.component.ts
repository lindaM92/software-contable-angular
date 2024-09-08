import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-venta',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './crear-venta.component.html',
  styleUrl: './crear-venta.component.css'
})
export class CrearVentaComponent {
  crear() {
    Swal.fire(
      'Venta creada exitosamente'
    );
  }

}
