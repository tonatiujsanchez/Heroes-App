import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from '../../../auth/interfaces/auth.interface';

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

  get titlePage(): string{
    return this._heroes.titlePage;
  }
  get auth(){
    return this._auth.auth;
  }

  constructor( 
    public _heroes:HeroesService,
    private router: Router,
    private _auth: AuthService
    ) { }

  ngOnInit(): void {
  }

  logout(){
    this._auth.logout();
    this.router.navigate(['/auth']);
  }
}
