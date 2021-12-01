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

  private slideMeetings = new Map<String,Meeting>();
  public slideMeetingsSubject = new Subject<Map<String,Meeting>>();

  public connectedUser: User;

  private slideFilters = {
    sport: undefined
  };

  constructor(private firestore: AngularFirestore) {
  }

  public add(meeting: Meeting){
    const meetingsCollection = this.firestore.collection('Meetings');
    meetingsCollection.add({
      title: meeting.title,
      sport: meeting.sport,
      level: meeting.level,
      spirit: meeting.spirit,
      nb_peoples: meeting.nb_peoples,
      location: meeting.location,
      cost: meeting.cost,
      date: meeting.date,
      description: meeting.description,
      user: meeting.user,
      isfull: meeting.isfull
    });
  }

  public update(meeting: Meeting,id: string){
    const meetingsCollection = this.firestore.collection('Meetings');
    meetingsCollection.doc(id).update(meeting);
  }

  public emitMyMeetingsSubject(){
    this.myMeetingsSubject.next(this.myMeetings);
  }

  public clearMyMeetings(){
    this.myMeetings.clear();
  }

  public getMyMeetings(){
    this.clearMyMeetings();
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

  public emitSlideMeetingsSubject(){
    this.slideMeetingsSubject.next(this.slideMeetings);
  }

  public clearSlideMeetingsSubject(){
    this.slideMeetings.clear();
  }

  public getSlideMeetings(){
    this.clearSlideMeetingsSubject();
    let meetingsCollection: AngularFirestoreCollection<Meeting>;
    if(this.slideFilters.sport == undefined){
      meetingsCollection = this.firestore.collection('Meetings');
    }else{
      meetingsCollection = this.firestore.collection("Meetings", ref => ref.where("sport","==", this.slideFilters.sport));
    }
    meetingsCollection.snapshotChanges().subscribe(value => {
      value.forEach(action => {
        const data = action.payload.doc.data() as Meeting;
        const id = action.payload.doc.id;
        this.slideMeetings.set(id,data);
      });
      this.emitSlideMeetingsSubject();
    });
  }

  public updateSlideFilters(filters){
    this.slideFilters = filters;
    this.getSlideMeetings();
  }





}
