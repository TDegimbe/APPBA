import {User} from "./User.model";

export class Meeting {

  constructor(public title: string, public sport: string, public level: string, public spirit: string, public nb_peoples: number,
              public location: string, public cost, public date: string, public description: string, public user: string, public isfull: boolean){
  }
}
