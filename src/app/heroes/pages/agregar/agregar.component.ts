import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  constructor(
    private _heroes: HeroesService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._heroes.titlePage = 'Nuevo Heroe';
    });
    
  }

}
