import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {User} from "../../models/User.model";
import {ToastController} from "@ionic/angular";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import * as shajs from 'sha.js';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.scss'],
})
export class InscriptionFormComponent implements OnInit {

  inscriptionForm: FormGroup;
  public errors = {};

  constructor(private formBuilder: FormBuilder,private userService: UserService,
              private toastController: ToastController,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  onChange(input){
    if(this.inscriptionForm.get(input).hasError('required')){
      this.errors[input] = 'Ce champ est obligatoire';
    }else if(this.inscriptionForm.get(input).hasError('pattern')){
      if(input === 'email'){
        this.errors[input] = 'E-mail invalide';
      }
    }else{
      delete this.errors[input];
    }
  }
  onSubmit() {
    const formValue = this.inscriptionForm.value;
    this.userService.checkIfExist(formValue.user).then(status1 => {
        this.userService.checkEmailUsed(formValue.email).then(status2 => {
          if(!status2 && !status1) {

            const newUser = new User(
              formValue.email.trim(),
              formValue.phone.trim(),
              formValue.password,
              formValue.user.trim(),
              formValue.lastname.trim(),
              formValue.firstname.trim(),
              ""
            );
            let session = newUser.email + newUser.phone + newUser.user + newUser.firstname + Math.random();
            session = shajs('sha256').update(session).digest('hex');
            let password = newUser.password;
            password = shajs('sha256').update(password).digest('hex');

            newUser.password = password;
            newUser.session = session

            this.userService.add(newUser);
            this.authService.setUser(newUser);
            this.router.navigate(["/home"]);
            this.presentToast();

          }else{
            if(status1) this.errors['user'] = "Ce nom d'utilisateur est déjà utilisé";
            if(status2) this.errors['email'] = 'Cette addresse e-mail est déjà utilisée';
          }
        });
    });

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inscription réussie!',
      duration: 2000
    });
    await toast.present();
  }

  initForm() {
    this.inscriptionForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      user: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      cgu: [false, Validators.requiredTrue]
    });
  }

}
