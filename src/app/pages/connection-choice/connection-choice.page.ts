import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-connection-choice',
  templateUrl: './connection-choice.page.html',
  styleUrls: ['./connection-choice.page.scss'],
})
export class ConnectionChoicePage implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
  }

}
