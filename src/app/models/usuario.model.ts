export interface IUsuarioData {
  nombre: string;
  apellido: string;
  contacto: string;
  contrasena: string;
  correo: string;
  nacimiento: string;
}

export interface IUsuarioLogin {
  correo: string;
  contrasena: string;
}

export interface IContrasenaInfo
{
  contrasenaAnterior: string;
  nvaContrasena: string;
 
}