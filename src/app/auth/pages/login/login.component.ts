import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private _auth: AuthService
  ) { }

  login(){
    // Ir al backend
    // Un usuario
    this._auth.login( 1 )
      .subscribe(
        (resp)=>{
          if( resp.id ){
            this.router.navigate(['/heroes']);
          }
        },(err)=>{  }  
      );
  }


}
