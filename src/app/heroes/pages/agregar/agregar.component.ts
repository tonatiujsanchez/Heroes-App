import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe:Heroe = {
    superhero: '',
    alter_ego: '',
    characters:'',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  };
  
  constructor(
    private _heroes: HeroesService,
    private activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    
    if(!this.router.url.includes('editar')){
      setTimeout(() => {
        this._heroes.titlePage = 'Nuevo Heroe';
      });
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({ id })=> this._heroes.getHeroePorId( id ))
    )
    .subscribe(
      ( heroe ) =>{
        this._heroes.titlePage = 'Editar Heroe';
        this.heroe = heroe;
      });
    


    
  }

  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return;
    }

    if(this.heroe.id){
      // Actualizar
      this._heroes.actualizarHeroe( this.heroe )
        .subscribe( 
          (heroe)=> console.log( 'Se actualizó: ', heroe ) 
        );
    }else{
      // Nuevo
      this._heroes.agregarHeroe( this.heroe )
        .subscribe( 
          (heroe) => this.router.navigate(['/heroes/editar', heroe.id])        
        );
    }
    
  }

  eliminar(){
    this._heroes.eliminarHeroe( this.heroe.id! ).subscribe(
      (resp) => {
        this.router.navigate(['/heroes/listado'])
        console.log( resp )
      });
    
  }

}
