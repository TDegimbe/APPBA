import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from '../models/User.model';
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  public setPP(file,user) {
    const filePath = 'pp/'+ user.session;
    return this.storage.upload(filePath, file);
  }

  public add(user: User): void{
    const usersCollection = this.firestore.collection('Users');
    usersCollection.add({email: user.email, email_lowercase: user.email.toLowerCase(), phone: user.phone, password: user.password, user: user.user,
      user_lowercase: user.user.toLowerCase(),lastname: user.lastname, firstname: user.firstname,session: user.session});
  }

  public del(user: User): Promise<boolean>{
    return new Promise((resolve,reject) => {
      const meetingsCollection = this.firestore.collection('Meetings');
      const queryMeeting = meetingsCollection.ref.where("user","==",user.session);

      queryMeeting.get().then(array => {
        if(!array.empty){
          array.forEach(doc => {
            this.firestore.doc(doc.ref).delete();
          });
        }
      })

      const usersCollection = this.firestore.collection('Users');
      const query = usersCollection.ref.where("session","==",user.session);
      query.get().then(array => {
        if(!array.empty){
          const data: any = array.docs[0].data();
          this.firestore.doc(array.docs[0].ref).delete().then(() => {
            resolve(true);
          });
        }else{
          reject(new Error('Not found'));
        }
      })
    });
  }

  public getBySession(session): Promise<User>{
  return new Promise((resolve,reject) => {
      const usersCollection = this.firestore.collection('Users');
      const query = usersCollection.ref.where("session","==",session);
      query.get().then(array => {
        if(!array.empty){
          const data: any = array.docs[0].data();
          const newUser = new User(
            data.email,
            data.phone,
            data.password,
            data.user,
            data.lastname,
            data.firstname,
            data.session
          );
          resolve(newUser);
        }else{
          reject(new Error('Not found'));
        }
      })
    });
  }

  public checkIfExist(username): Promise<boolean>{
    return new Promise((resolve) => {
      const usersCollection = this.firestore.collection('Users');
      const query = usersCollection.ref.where("user_lowercase","==",username.toLowerCase().trim());
      let exist = false;
      query.get().then(array => {
        if(!array.empty){
          exist = true;
        }
        resolve(exist);
      });
    });
  }

  public checkEmailUsed(email): Promise<boolean>{
    return new Promise((resolve) => {
      const usersCollection = this.firestore.collection('Users');
      const query = usersCollection.ref.where("email_lowercase","==",email.toLowerCase().trim());
      let exist = false;
      query.get().then(array => {
        if(!array.empty){
          exist = true;
        }
        resolve(exist);
      });
    });
  }

}
