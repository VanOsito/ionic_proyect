import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { showToast } from 'src/app/tools/message-routines';
import { Usuario } from '../model/usuario';
import { Storage } from '@ionic/storage-angular';
import { DataBaseService } from './data-base.service';


@Injectable()

export class AuthService {

  keyUsuario = 'USUARIO_AUTENTICADO';
  usuarioAutenticado = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router, private bd: DataBaseService, private storage: Storage) { }

  inicializarAutenticacion() {
    this.storage.create();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.leerUsuarioAutenticado().then(usuario => {
      return usuario !== null;
    });
  }

  async login(correo: string, password: string) {
    await this.storage.get(this.keyUsuario).then(async (usuarioAutenticado) => {
      if (usuarioAutenticado) {
        this.bd.actualizarSesionActiva(correo, 'S');
        this.storage.set(this.keyUsuario, usuarioAutenticado);
        this.usuarioAutenticado.next(usuarioAutenticado);
        this.router.navigate(['inicio']);
      } else {
        await this.bd.validarUsuario(correo, password).then(async (usuario: Usuario | undefined) => {
          if (usuario) {
            showToast(`¡Bienvenido(a) ${usuario.nombre} ${usuario.apellido}!`);
            this.bd.actualizarSesionActiva(correo, 'S');
            this.storage.set(this.keyUsuario, usuario);
            this.usuarioAutenticado.next(usuario);
            this.router.navigate(['inicio']);
          } else {
            showToast(`El correo o la password son incorrectos`);
            this.router.navigate(['ingreso']);
          }
        });
      }
    });
  }

  async logout() {
    this.leerUsuarioAutenticado().then((usuario) => {
      if (usuario) {
        showToast(`¡Hasta pronto ${usuario.nombre} ${usuario.apellido}!`);
        this.bd.actualizarSesionActiva(usuario.correo, 'N');
        this.storage.remove(this.keyUsuario);
        this.usuarioAutenticado.next(null);
        this.router.navigate(['ingreso']);
      } else {
        this.router.navigate(['ingreso']);
      }
    })
  }

  async leerUsuarioAutenticado(): Promise<Usuario | undefined> {
    const usuario = await this.storage.get(this.keyUsuario).then(usuario => usuario as Usuario);
    this.usuarioAutenticado.next(usuario);
    return usuario;
  }

  setUsuarioAutenticado(usuario: Usuario) {
    this.storage.set(this.keyUsuario, usuario);
    this.usuarioAutenticado.next(usuario);
  }

  async verificacionCorreo(correo: string) {
    // Verificar si el correo es válido
    if (!this.isValidEmail(correo)) {
      showToast('La dirección de correo electrónico no es válida');
      return;
    }

    // Redirige a la página de "pregunta"
    this.router.navigate(['pregunta']);
  }

  // Función de verificación de correo electrónico
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }


  async verificacionRespuesta(respuestaSecreta: string) {
    // Verifica si la respuesta es correcta
    if (this.esRespuestaCorrecta(respuestaSecreta)) {
      // Redirige a la página "correcto"
      this.router.navigate(['/correcto']);
    } else {
      // Redirige a la página "incorrecto"
      this.router.navigate(['/incorrecto']);
    }
  }

  private esRespuestaCorrecta(respuestaSecreta: string): boolean {
    // Implementa la lógica para verificar si la respuesta es correcta.
    // Por ejemplo, puedes comparar la respuesta con una respuesta esperada.
    const respuestaEsperada = "respuestaCorrecta"; // Cambia esto a tu respuesta esperada
  
    // Devuelve true si la respuesta es correcta, de lo contrario, devuelve false
    return respuestaSecreta === respuestaEsperada;
  }
  
  
}


