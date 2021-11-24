import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-verifcode',
  templateUrl: './verifcode.page.html',
  styleUrls: ['./verifcode.page.scss'],
})
export class VerifcodePage implements OnInit {

  public loaded = false;

  constructor(private authService: AuthService) {
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
