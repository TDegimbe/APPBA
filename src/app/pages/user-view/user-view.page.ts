import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.page.html',
  styleUrls: ['./user-view.page.scss'],
})
export class UserViewPage implements OnInit {

  public loaded = false;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.load();
  }
  
  load(){
    if (!this.authService.isLogged()) {
      this.authService.loadAuth().then(status => {
        if (status) {
          this.loaded = true;
        }
      });
    }else{
      this.loaded = true;
    }
  }

}
