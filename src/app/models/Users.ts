import {AngularFirestore} from '@angular/fire/compat/firestore';
export class Users{

  constructor(public email: string, public phone: string, public password: string,
              public user: string, public name: string, public firstname: string,
              private firestore: AngularFirestore){
  }
  public save(): void{
    const usersCollection = this.firestore.collection('Users');
    usersCollection.add({email: this.email, phone: this.phone, password: this.password, user: this.user,
    name: this.name, firstname: this.firstname});
  }
}
