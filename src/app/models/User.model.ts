import {AngularFirestore} from '@angular/fire/compat/firestore';
export class User {

  constructor(public email: string, public phone: string, public password: string,
              public user: string, public lastname: string, public firstname: string,public session: string){
  }
}
