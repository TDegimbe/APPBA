import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/User.model";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-user-pp',
  templateUrl: './user-pp.component.html',
  styleUrls: ['./user-pp.component.scss'],
})
export class UserPpComponent implements OnInit {

  public loaded = true;
  @Input() user: User;
  @Input() isimg = false;
  @Input() src = "";
  @Input() events: Observable<void>;
  @Input() isHome = false;

  constructor(public el: ElementRef, public firestore: AngularFireStorage) { }

  ngOnInit() {
      this.firestore.ref("/pp/"+this.user.session).getDownloadURL().toPromise()
      .then(value => {
        this.isimg = true;
        this.src = value;
      })
      .catch(error => {});
  }

}
