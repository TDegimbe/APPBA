import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User.model";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class VerificationcodeService {

  constructor(private http: HttpClient,private toastController: ToastController, private router: Router) { }

  public genPhoneandMailCode(user: User){
    const body = {
      user_session: user.session,
      user_mail: user.email,
      user_phone: user.phone,
      key: "c71b993900385cd1caf0b84e9df7329f8bd26f7bc97f33f2f42ce023c24c51ff"
    };
    this.http.post("https://sportifs.lpow.ephec.be/register.php",body).toPromise().then(value => {
      console.log(value);
    });
  }
  public verifCodes(user: User,phonecode: number, mailcode: number): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      const body = {
        user_session: user.session,
        phone_code: phonecode,
        mail_code: mailcode,
        key: "c71b993900385cd1caf0b84e9df7329f8bd26f7bc97f33f2f42ce023c24c51ff"
      };
      this.http.post("https://sportifs.lpow.ephec.be/verification.php",body).toPromise().then(value => {
        console.log(value);
        if(value == "1"){
          this.presentToast();
          this.router.navigate(['/home']);
        }
      });
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Codes validés!',
      duration: 2000
    });
    await toast.present();
  }

  public isValid(user: User): Promise<boolean>{
    return new Promise<boolean>(resolve => {
      const body = {
        user_session: user.session,
        key: "c71b993900385cd1caf0b84e9df7329f8bd26f7bc97f33f2f42ce023c24c51ff"
      };
      this.http.post("https://sportifs.lpow.ephec.be/isvalid.php",body).toPromise().then(value => {
        console.log(value);
        if(value == "0"){
          resolve(false);
        }else if(value == "1"){
          resolve(true);
        }
      });
      resolve(false);
    });
  }
}
