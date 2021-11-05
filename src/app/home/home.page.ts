import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public loaded = false;

  constructor(public authService: AuthService) {
    this.load();
  }
  load(){
    this.authService.loadAuth().then(status => {
      if(status){
        this.loaded = true;
      }
    });
  }
  click(){
    console.log(this.authService.getUser())
  }

}
