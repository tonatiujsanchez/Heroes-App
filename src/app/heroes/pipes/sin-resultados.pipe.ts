import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'sinResultados'
})
export class SinResultadosPipe implements PipeTransform {

  transform(heroes: Heroe[]): Heroe[] {
    console.log(heroes);
    
    
    if( heroes.length <= 0 ){
      heroes = [{
        id:               '',
        superhero:        '',
        alter_ego:        '',
        first_appearance: '',
        characters:       '',
      }];
      return heroes
    }else{
      return heroes;
    }
  }

}
