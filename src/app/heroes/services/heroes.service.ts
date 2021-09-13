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

}
