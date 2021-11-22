import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Meeting} from "../models/Meeting.model";
import {Subject} from "rxjs";
import {User} from "../models/User.model";

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  private myMeetings = new Map<String,Meeting>();
  public myMeetingsSubject = new Subject<Map<String,Meeting>>();
  public connectedUser: User;

  constructor(private firestore: AngularFirestore) {
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

  public clearMyMeetings(){
    this.myMeetings.clear();
  }

  public getMyMeetings(){
    const meetingsCollection: AngularFirestoreCollection<Meeting> = this.firestore.collection('Meetings', ref => ref.where("user","==", this.connectedUser.session));
    meetingsCollection.snapshotChanges().subscribe(value => {
      value.forEach(action => {
        const data = action.payload.doc.data() as Meeting;
        const id = action.payload.doc.id;
        this.myMeetings.set(id,data);
      });
      this.emitMyMeetingsSubject();
    });
  }

  public getSlideMeetings(): Promise<Map<String,Meeting>> {
    return new Promise<Map<String,Meeting>>(resolve => {
      const meetingsCollection: AngularFirestoreCollection<Meeting> = this.firestore.collection('Meetings');
      meetingsCollection.get().toPromise().then(array => {
        const meetings: Map<String,Meeting> = new Map<String, Meeting>();
        array.forEach(doc => {
          const meeting = doc.data() as Meeting;
          const id = doc.id;
          meetings.set(id,meeting);
        });
        resolve(meetings);
      });
    });
  }




}
