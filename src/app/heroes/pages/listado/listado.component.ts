import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  heroes:Heroe[] = [];
  constructor( private _heroes: HeroesService ) { }

  ngOnInit(): void {
    this._heroes.getHeroes()
    .subscribe( ( resp:Heroe[] ) => this.heroes = resp );
  }
  

}
