import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ui-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
