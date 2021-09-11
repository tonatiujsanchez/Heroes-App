import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .pages-container{
      padding: 16px;
    }
  `]
})
export class HomeComponent implements OnInit {



  constructor( 
    public _heroes:HeroesService
    ) { }

  ngOnInit(): void {
  }


}
