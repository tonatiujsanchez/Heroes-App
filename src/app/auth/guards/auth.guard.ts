import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad, CanActivate {

  constructor(
    private _auth: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this._auth.verificaAutenticacion()
        .pipe(
          tap( resp => {
            if( !resp ){
              this.router.navigate(['/auth/login']);
            }
          })
        )

      // if( this._auth.auth.id ){
      //   return true
      // }else{
      //   console.warn('¡AUTENTIFÍQUESE! Activate');
      //   return false;
      // };
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {


      return this._auth.verificaAutenticacion()
      .pipe(
        tap( resp => {
          if( !resp ){
            this.router.navigate(['/auth/login']);
          }
        })
      )


      // if( this._auth.auth.id ){
      //   return true
      // }else{
      //   console.warn('¡AUTENTIFÍQUESE! Load');
      //   return false;
      // }
      
  }
}
