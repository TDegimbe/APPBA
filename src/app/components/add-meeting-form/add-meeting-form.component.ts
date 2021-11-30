import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NavController, ToastController} from "@ionic/angular";
import {Meeting} from "../../models/Meeting.model";
import {AuthService} from "../../services/auth.service";
import {MeetingService} from "../../services/meeting.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-meeting-form',
  templateUrl: './add-meeting-form.component.html',
  styleUrls: ['./add-meeting-form.component.scss'],
})
export class AddMeetingFormComponent implements OnInit {

  addmeetingForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController,
              private authService: AuthService, private meetingService: MeetingService,
              private router: Router, private navController: NavController) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const formValue = this.addmeetingForm.value;
    const newMeeting = new Meeting(
      formValue.title,
      formValue.sport,
      formValue.level,
      formValue.spirit,
      formValue.nb_peoples,
      formValue.location,
      formValue.cost,
      formValue.date,
      formValue.description,
      this.authService.getUser().session,
      false
    );
    this.meetingService.add(newMeeting);
    this.presentToast();
    this.navController.navigateBack(['/home/my-meetings']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Annonce ajoutée!',
      duration: 2000
    });
    await toast.present();
  }

  initForm() {
    this.addmeetingForm = this.formBuilder.group({
      title: ['', Validators.required],
      sport: ['', Validators.required],
      nb_peoples: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      cost: [''],
      level: ['', Validators.required],
      spirit: ['', Validators.required]
    });
  }

}
