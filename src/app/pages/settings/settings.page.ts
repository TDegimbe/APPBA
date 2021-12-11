import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public loaded: boolean = false;

  constructor(public authService: AuthService, public userService: UserService, private router: Router, public alertCtrl: AlertController) {
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

  delAccount(){
    this.userService.del(this.authService.getUser()).then(status =>{
      if(status){
        this.authService.logout();
        this.router.navigate(['/connection-choice']);
      }
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Suppression du compte',
      message: 'Voulez-vous vraiment supprimer votre compte?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Oui',
          handler: () => {
            this.delAccount()
          },
        },
      ],
    });

    await alert.present();
  }

}
