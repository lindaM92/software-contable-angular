import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VentasService } from '../../services/ventas/ventas.service';
import { Subscription } from 'rxjs';
import { IVenta, IVentaResponse } from '../../models/venta.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-venta',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './detalle-venta.component.html',
  styleUrl: './detalle-venta.component.css',
})
export class DetalleVentaComponent implements OnInit, OnDestroy {
  ventasSubs!: Subscription;
  ventasData!: IVentaResponse[];
  ventaSeleccionada!: IVenta;

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.ventasSubs = this.ventasService.obtenerVentas().subscribe((valor) => {
      this.ventasData = valor.map((valor: any) => {
        const documentData = valor.payload.doc.data() as IVenta;
        const id = valor.payload.doc.id;
        return { id, ...documentData };
      });

      console.log("ventas registradas", this.ventasData);
      
    });
  }

  ngOnDestroy(): void {
    this.ventasSubs.unsubscribe();
  }

  seleccionarVenta(): void {


    console.log("venta seleccionada", this.ventaSeleccionada);
    
  }
}
