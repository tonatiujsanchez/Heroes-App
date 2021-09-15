import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private baseUrl: string = environment.baseUrl;

  public titlePage: string = 'Heroes';


  constructor( private http: HttpClient ) { }



  getHeroes():Observable<Heroe[]>{

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId( idHeroe:string ):Observable<Heroe>{
    
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${idHeroe}`);
  }

  getSugerencias( query:string ):Observable<Heroe[]>{

    return this.http.get<Heroe[]>( `${ this.baseUrl }/heroes?q=${ query }&_limit=5` );
  }

  agregarHeroe( heroe:Heroe ):Observable<Heroe>{
    return this.http.post<Heroe>( `${ this.baseUrl }/heroes`, heroe)
  }

  actualizarHeroe( heroe:Heroe ):Observable<Heroe>{
    return this.http.put<Heroe>( `${ this.baseUrl }/heroes/${ heroe.id }`, heroe)
  }

  eliminarHeroe( id:string ):Observable<any>{
    return this.http.delete<any>( `${ this.baseUrl }/heroes/${ id }`)
  }

}
