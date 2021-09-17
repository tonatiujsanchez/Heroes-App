import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  .formulario-login{
    width: 100vw;
    height: 100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .formulario__content{
    width: 250px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  `]
})
export class LoginComponent {

  constructor(
    private router: Router,
    private _auth: AuthService
  ) { }

  login( idUsuario:string ){
    if( idUsuario.trim() === '' ){
      console.warn('Ingrese un ID');
      return;
    }

    this._auth.login( idUsuario )
      .subscribe(
        (resp)=>{
          if( resp.id ){
            this.router.navigate(['/heroes']);
          }
        },(err)=>{ 
          console.log('No se encontró ningún usuario con el ID ingresado.');
          
         }  
      );
  }

  accederSinLogin(){
    this.router.navigate(['/heroes/listado']);
  }


}
