import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino:string = '';
  heroes: Heroe[] = [];

  heroeSelecionado!:Heroe | null;

  constructor( 
    private _heroes: HeroesService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._heroes.titlePage = 'Buscar Heroe';
    });
  }

  buscando(){
    this._heroes.getSugerencias( this.termino.trim() )
      .subscribe(
        data => this.heroes = data
      )
  }

  opcionSelecionada( event:MatAutocompleteSelectedEvent ){
    
    if( event.option.value === ''){
      this.heroeSelecionado = null;
      console.warn('Sin resultados');
      return;
    }
    
    const heroe:Heroe = event.option.value;
    this.termino = heroe.superhero;
    
    this._heroes.getHeroePorId( heroe.id! )
      .subscribe(
        (heroe) => this.heroeSelecionado = heroe
      );
    

    
  }

}
