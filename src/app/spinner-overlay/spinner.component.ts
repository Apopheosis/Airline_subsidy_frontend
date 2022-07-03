import { Component, OnInit, Input } from '@angular/core';
import {SpinnerOverlayService} from "./spinner-overlay.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  @Input() message = '';

  constructor(public overlayService: SpinnerOverlayService) { }

  ngOnInit() {
  }
}
