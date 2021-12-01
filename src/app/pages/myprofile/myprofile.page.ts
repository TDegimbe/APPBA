import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {CompressImageService} from "../../services/compressimage.service";
import {ToastController} from "@ionic/angular";
import {Subject} from "rxjs";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  public loaded: boolean = false;
  public fileisuploading: boolean = false;
  public pp_src = "test";
  public imageset = false;

  constructor(public authService: AuthService, private userService: UserService, public router: Router,
              private compressImage: CompressImageService, private toastController: ToastController) {
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


  onUploadFile(file: File) {
    if(!this.fileisuploading){
      this.fileisuploading = true;
      this.imageset = false;
      this.compressImage.compress(file).then(filecompressed => {
        this.userService.setPP(filecompressed,this.authService.getUser()).then(
          (task) => {
            if(task.state == "success"){
              console.log("success");
              task.ref.getDownloadURL().then(value => {
                console.log("updateview");
                this.presentToast();
                this.pp_src = value;
                this.imageset = false;
                this.fileisuploading = false;
              })
            }
          });
      });
    }
  }

  detectFiles(event) {
    if(event.target.files[0] != undefined) this.onUploadFile(event.target.files[0]);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Photo changée!',
      duration: 2000
    });
    await toast.present();
  }
}
