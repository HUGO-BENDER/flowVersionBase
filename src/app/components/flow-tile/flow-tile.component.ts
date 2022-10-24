import { Component, Input } from '@angular/core';
import { flowTile } from 'src/app/app.model';

@Component({
  selector: 'app-flow-tile',
  templateUrl: './flow-tile.component.html',
  styleUrls: ['./flow-tile.component.css'],
})
export class FlowTileComponent {

  @Input() flowTile!: flowTile;

  constructor() {}

}
