import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "@lav/users";

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logOut();
  }
}
