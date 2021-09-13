import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
  ]
})
export class HeroeComponent implements OnInit {

  heroe!:Heroe;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _heroes: HeroesService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._heroes.titlePage = 'Heroe Detalles' 
    });
    
    this.activateRoute.params
    .pipe(
      switchMap( ( {id} ) => this._heroes.getHeroePorId( id ) )
    )
    .subscribe(
      ( heroe )=>{ this.heroe = heroe }
    );
  }

  regresar(){
    // this.router.navigate(['heroes', 'listado']);
    this.location.back();
  }

}
