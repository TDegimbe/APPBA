import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.scss'],
})
export class ConnectionFormComponent implements OnInit {

  connectionForm: FormGroup;
  public errors = {};

  constructor(private formBuilder: FormBuilder,private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onChange(input){
    if(this.connectionForm.get(input).hasError('required')){
      this.errors[input] = 'Ce champ est obligatoire';
    }else{
      delete this.errors[input];
    }
  }

  onSubmit(){
    const formValue = this.connectionForm.value;
    this.authService.auth(formValue.user,formValue.password).then(status1 =>{
      if(status1){
        this.router.navigate(["/home"]);
      }
      else{
        this.errors['password'] = "Le nom d'utilisateur ou le mot de passe est incorrect"
      }

    });
  }

  initForm() {
    this.connectionForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
