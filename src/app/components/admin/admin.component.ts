import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit {
  esAdministrador: boolean = false;

  constructor(private authService: AuthService) {
    if (this.authService.esAdministrador) {
    console.log('¡Eres un administrador!');
  } else {
    console.log('No eres un administrador.');
  }
}


  ngOnInit() {}

}
