import { Routes } from '@angular/router';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';
import { DetalleVentaComponent } from './components/detalle-venta/detalle-venta.component';
import { MenuComponent } from './components/menu/menu.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { InventarioComponent } from './components/inventario/inventario.component';

//Configuración de rutas
export const routes: Routes = [
  {
    path: 'inicio-sesion',
    loadComponent: () =>
      import('./components/inicio-sesion/inicio-sesion.component').then(
        (c) => InicioSesionComponent
      ),
  },
  {
    path: 'crear-producto',
    loadComponent: () =>
      import('./components/crear-producto/crear-producto.component').then(
        (c) => CrearProductoComponent
      ),
  },
  {
    path: 'crear-venta',
    loadComponent: () =>
      import('./components/crear-venta/crear-venta.component').then(
        (c) => CrearVentaComponent
      ),
  },
  {
    path: 'detalle-venta',
    loadComponent: () =>
      import('./components/detalle-venta/detalle-venta.component').then(
        (c) => DetalleVentaComponent
      ),
  },

  {
    path: 'menu',
    loadComponent: () =>
      import('./components/menu/menu.component').then((c) => MenuComponent),
  },
  {
    path: 'cambiar-contrasena',
    loadComponent: () =>
      import(
        './components/cambiar-contrasena/cambiar-contrasena.component'
      ).then((c) => CambiarContrasenaComponent),
  },

  {
    path: 'reporte',
    loadComponent: () =>
      import('./components/reporte/reporte.component').then(
        (c) => ReporteComponent
      ),
  },
  {
    path: 'cambiar-contrasena',
    loadComponent: () =>
      import(
        './components/cambiar-contrasena/cambiar-contrasena.component'
      ).then((c) => CambiarContrasenaComponent),
  },

  {
    path: 'registro',
    loadComponent: () =>
      import('./components/registro/registro.component').then(
        (c) => RegistroComponent
      ),
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./components/inventario/inventario.component').then(
        (c) => InventarioComponent
      ),
  },

  //ruta para que por defecto me lleve a inicio de sesion
  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full',
  },

  //ruta para que cuando se escriba una ruta que noexista me lleve siepre a inicio de sesion
  { path: '**', pathMatch: 'full', redirectTo: 'inicio-sesion' },
];
