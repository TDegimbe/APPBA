import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Meeting} from "../models/Meeting.model";
import {Subject} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private myMeetings = new Map<String,Meeting>();
  public myMeetingsSubject = new Subject<Map<String,Meeting>>();

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
  }

  public add(meeting: Meeting){
    const meetingsCollection = this.firestore.collection('Meetings');
    meetingsCollection.add({
      title: meeting.title,
      sport: meeting.sport,
      nb_peoples: meeting.nb_peoples,
      location: meeting.location,
      date: meeting.date,
      description: meeting.description,
      user: meeting.user
    });
  }
  emitMyMeetingsSubject(){
    this.myMeetingsSubject.next(this.myMeetings);
  }

  public getMyMeetings(){
    const meetingsCollection: AngularFirestoreCollection<Meeting> = this.firestore.collection('Meetings', ref => ref.where("user","==", this.authService.getUser().session));
    meetingsCollection.snapshotChanges().subscribe(value => {
      value.forEach(action => {
        const data = action.payload.doc.data() as Meeting;
        const id = action.payload.doc.id;
        this.myMeetings.set(id,data);
      });
      this.emitMyMeetingsSubject();
    });
  }


}
