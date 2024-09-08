import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import {
  IContrasenaInfo,
  IUsuarioData,
  IUsuarioLogin,
} from '../../models/usuario.model';
import { Router } from '@angular/router';
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signOut,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    private afAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router
  ) {
    // this.afAuth.authState.subscribe(() => {});
  }

  registrarUsuario(usuario: IUsuarioData) {
    Swal.showLoading();
    const { correo, contrasena } = usuario;
    return this.afAuth
      .createUserWithEmailAndPassword(correo, contrasena)
      .then((userCredential) => {
        this.userData = userCredential.user;
        this.registrarDataUsuario(usuario);
      })
      .catch((error) => {
        let textError: string = error;

        if (
          error.customData._tokenResponse.error.errors[0].message ===
          'EMAIL_EXISTS'
        ) {
          textError =
            'El usuario con el correo electronico' +
            ' ' +
            usuario.correo +
            ' ' +
            'ya existe';
        }

        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: textError,
        });
      });
  }

  registrarDataUsuario(usuario: IUsuarioData): void {
    this.angularFireStore
      .collection('usuarios')
      .add(usuario)
      .then((response) => {
        Swal.fire({
          title: 'BIEN',
          text: 'Usuario registrado satisfactoriamente',
          icon: 'success',
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Ocurrio un error en el servidor',
          text: error,
        });
      });
  }

  loguearUsuario(usuario: IUsuarioLogin): Promise<any> {
    Swal.showLoading();
    const { correo, contrasena } = usuario;

    return this.afAuth
      .signInWithEmailAndPassword(correo, contrasena)
      .then(() => {
        this.router.navigateByUrl('/menu');
        Swal.fire({
          title: 'BIEN',
          text: 'Usuario logueado satisfactoriamente',
          icon: 'success',
        });
      })
      .catch((error) => {
        let textError = error;

        if (error.code.includes('auth/invalid-credential')) {
          textError = 'Usuario o contraseña incorrectos';
        }

        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: textError,
        });
      });
  }

  cerrarSesion(): void {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('Sesión cerrada exitosamente.');
      })
      .catch((error) => {
        console.error('Error al cerrar la sesión:', error);
      });
  }

  cambiarContrasena(infoContrasena: IContrasenaInfo): void {
    const { contrasenaAnterior, nvaContrasena } = infoContrasena;
    const auth = getAuth();
    const user: any = auth.currentUser;
    console.log('INFO USUARIO', user);

    if (user) {
      // Crear credenciales con el correo del usuario y la contraseña anterior
      const credential = EmailAuthProvider.credential(
        user.email,
        contrasenaAnterior
      );

      // Re-autenticar al usuario
      reauthenticateWithCredential(user, credential)
        .then(() => {
          // Si la re-autenticación es exitosa, actualizar la contraseña
          return updatePassword(user, nvaContrasena);
        })
        .then(() => {
          console.log('Contraseña actualizada exitosamente.');
        })
        .catch((error) => {
          console.error(
            'Error en la re-autenticación o al actualizar la contraseña:',
            error
          );
        });
    } else {
      console.log('No hay usuario autenticado.');
    }
  }
}
