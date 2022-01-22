import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngshop-home-page',
  templateUrl: './home-page.component.html',
  encapsulation: ViewEncapsulation.Emulated
})
export class HomePageComponent implements OnInit {

  isValid = true;

  constructor() { }

  ngOnInit(): void {
  }

}
