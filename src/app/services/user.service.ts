import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {User} from '../models/User.model';
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) {}
  public add(user: User): void{
    const usersCollection = this.firestore.collection('Users');
    usersCollection.add({email: user.email, phone: user.phone, password: user.password, user: user.user,
      lastname: user.lastname, firstname: user.firstname,session: user.session});
  }

  public getAll(): Promise<User[]>{
    return new Promise((resolve) => {
      const usersList: User[] = [];
      const usersCollection = this.firestore.collection('Users');
      usersCollection.get().toPromise()
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((user: any) => {
            const data = user.data();
            const newUser = new User(
              data.email,
              data.phone,
              data.password,
              data.user,
              data.lastname,
              data.firstname,
              data.session
            );
            usersList.push(newUser);
            resolve(usersList);
          });
        });
    });
  }

  public getBySession(session): Promise<User>{
    return new Promise((resolve) => {
      this.getAll().then(usersList => {
        let usertoconnect: User;
        usersList.forEach(user => {
          if(user.session !== undefined) {
            if (user.session === session) {
              usertoconnect = user;
            }
          }
        });
        resolve(usertoconnect);
      });
    });
  }

  public checkIfExist(username): Promise<boolean>{
    return new Promise((resolve) => {
      this.getAll().then(usersList => {
        let exist = false;
        usersList.forEach(user => {
          if(user.user !== undefined){
            if(user.user.toLowerCase().trim() === username.toLowerCase().trim()){
              exist = true;
            }
          }
        });
        resolve(exist);
      });
    });
  }

  public checkEmailUsed(email): Promise<boolean>{
    return new Promise((resolve) => {
      this.getAll().then(usersList => {
        let exist = false;
        usersList.forEach(user => {
          if(user.email !== undefined) {
            if (user.email.toLowerCase().trim() === email.toLowerCase().trim()) {
              exist = true;
            }
          }
        });
        resolve(exist);
      });
    });
  }

}
