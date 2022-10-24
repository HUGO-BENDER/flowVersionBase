import { Component, Input, Output, EventEmitter  } from '@angular/core';
import { flowButton } from './../../app.model';

@Component({
  selector: 'app-flow-button',
  templateUrl: './flow-button.component.html',
  styleUrls: ['./flow-button.component.css']
})
export class FlowButtonComponent {

  @Input() flowbutton!: flowButton;
  @Output() startFlowEvent = new EventEmitter();

  constructor() { }

  onStartFlow(){
    this.startFlowEvent.emit();
  }

}
