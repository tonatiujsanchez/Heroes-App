import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, tap } from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private authUser: Auth | undefined;

  get auth(){
    return { ...this.authUser }
  }

  constructor(
    private http: HttpClient
  ) {}

    verificaAutenticacion(): Observable<boolean>{
      if( !localStorage.getItem( 'token' ) ){
        return of( false );
      }

      const idUser: string = JSON.stringify( localStorage.getItem( 'token' ) );

      return this.http.get<Auth>( `${ this.baseUrl }/usuarios/${ 1 }` )
        .pipe(
          map( auth =>{
            this.authUser = auth;
            return true;
          })
        )
    }



  login( idUsuario:number ):Observable<Auth>{
    return this.http.get<Auth>( `${ this.baseUrl }/usuarios/${ idUsuario }` )
    .pipe(
      tap( auth =>{
        this.authUser = auth;
        localStorage.setItem( 'token', auth.id );
      })
    )
  }

  logout(){
    this.authUser = undefined;
    localStorage.removeItem( 'token');
  }




}
