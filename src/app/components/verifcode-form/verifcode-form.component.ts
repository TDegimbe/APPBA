import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {VerificationcodeService} from "../../services/verificationcode.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-verifcode-form',
  templateUrl: './verifcode-form.component.html',
  styleUrls: ['./verifcode-form.component.scss'],
})
export class VerifcodeFormComponent implements OnInit {

  verifCodeForm: FormGroup;
  public errors = {};

  constructor(private authService: AuthService,private formBuilder: FormBuilder,private verificationCodeService: VerificationcodeService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  onChange(input){
    if(this.verifCodeForm.get(input).hasError('required')){
      this.errors[input] = 'Ce champ est obligatoire';
    }else{
      delete this.errors[input];
    }
  }

  onSubmit(){
    const formValue = this.verifCodeForm.value;
    this.verificationCodeService.verifCodes(this.authService.getUser(),formValue.phonecode,formValue.mailcode).then(value => {
      if(value != true){
        value.forEach(error =>{
          if(error == "invalid_phone_code"){
            this.errors['phonecode'] = "Code invalide"
          }else if(error == "invalid_mail_code"){
            this.errors['mailcode'] = "Code invalide"
          }
        });
      }
    });
  }

  initForm() {
    this.verifCodeForm = this.formBuilder.group({
      phonecode: ['', Validators.required],
      mailcode: ['', Validators.required]
    });
  }


}
