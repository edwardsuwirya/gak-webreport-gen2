import {Component, OnInit, Input} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-my-clear-input',
  templateUrl: './my-clear-input.component.html',
  styleUrls: ['./my-clear-input.component.css']
})
export class MyClearInputComponent implements OnInit {

  @Input()
  popupId: string;

  constructor() {
  }

  ngOnInit() {
  }

  openPopUp() {
    $(this.popupId).openModal();
  }
}
