import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

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
    public router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
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
          (heroe)=> {
            this.openSnackBar( `Se actualizó ${ this.heroe.superhero }` );
          } 
        );
    }else{
      // Nuevo
      this._heroes.agregarHeroe( this.heroe )
        .subscribe( 
          (heroe) => {
            this.openSnackBar( `Se creo correctamente` );
            this.router.navigate(['/heroes/editar', heroe.id]);
          }        
        );
    }
    
  }

  eliminar(){
    const dialogRef = this.dialog.open( ConfirmarComponent, {
      width: '300px',
      data: this.heroe.superhero
    });

    dialogRef.afterClosed().subscribe(
      resp =>{

        if( resp ){
          this._heroes.eliminarHeroe( this.heroe.id! ).subscribe(
            (resp) => {
              this.router.navigate(['/heroes/listado']);
              this.openSnackBar('¡Eliminado!');
          });
        }

      }
    );

  }

  openSnackBar( msj:string ):void {
    this._snackBar.open(msj, 'ok!', {
      duration: 1500
    });
  }

}
