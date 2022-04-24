import {Component, OnInit} from '@angular/core';
import {UsersService} from "@lav/users";

@Component({
    selector: 'ngshop-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private userService: UsersService) {
  }
    title = 'ngshop';

  ngOnInit(): void {
    this.userService.initAppSession();
  }
}
