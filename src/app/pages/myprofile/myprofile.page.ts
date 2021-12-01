import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  public loaded: boolean = false;
  public fileisuploading: boolean = false;
  @ViewChild("pp") pp;
  public pp_src = "";
  public imageset = false;


  constructor(public authService: AuthService, private userService: UserService, public router: Router) {
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
      this.userService.setPP(file,this.authService.getUser()).then(
        (task) => {
          if(task.state == "success"){
            task.ref.getDownloadURL().then(value => {
              this.pp_src = value;
              this.imageset = true;
            })
          }
        });
    }
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
