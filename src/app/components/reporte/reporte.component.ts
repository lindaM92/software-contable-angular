import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent {
  recuperar() {
    Swal.fire(
      'El reporte de utilidades o perdidas se ha generado con éxito, por favor revise su correo y verifique que el PDF con la información halla llegado..'
    );
  }
}

