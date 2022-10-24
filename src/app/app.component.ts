import { Component, HostListener } from '@angular/core';
import { flowButton, flowTile, flowVirus } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ngFlow';

  cantTurn = 25;
  cantVirus = 6;
  gridWidthInPx = 0;
  gridHeightInPx = 0;
  gridX = 14;
  gridY = 14;

  virus: Array<flowVirus> = [];
  buttons: Array<flowButton> = [];
  grid: Array<Array<flowTile>> = [[]];
  tilesToChange: Array<flowTile> = [];

  palette: Array<string> = [
    '#009000',
    '#7979F7',
    '#EEEE00',
    '#f32828',
    '#EEEEEE',
    '#f52cf5',
  ];

  constructor() {
    this.virus = this.getVirus();
    this.buttons = this.getButtons();
    this.grid = this.getGrid();
    this.calculateGridSize();
  }

  startFlow(index: number) {
    if (this.cantTurn == 0) {
      return;
    }

    if (this.grid[0][0].color == this.virus[index].color) {
      console.log('movimiento no permitido');
      return;
    }

    this.cantTurn--;
    this.tilesToChange = [];

    const oldColor = this.grid[0][0].color;
    const newColor = this.buttons[index].color;
    this.DoGameTurn(oldColor, newColor, 0, 0);

    if (!this.checkGameWon()){
      this.checkLostGame();
    }
  }

  checkGameWon():Boolean {
    const topLeft = this.grid[0][0].color;

    for (let y = 0; y < this.gridY; y++) {
      for (let x = 0; x < this.gridX; x++) {
            if (this.grid[x][y].color !== topLeft)
            {
                return false;
            }
        }
    }
    alert("GANASTE");
    return true
  }

  checkLostGame() {
    if (this.cantTurn < 1){
      alert("PERDISTE");
    }
  }

  DoGameTurn(oldColor: string, newColor: string, row: number, col: number ) {
    if (oldColor === newColor || this.grid[row][col].color !== oldColor) {
      return;
    }

    if (this.tilesToChange.indexOf(this.grid[row][col]) === -1) {
      this.tilesToChange.push(this.grid[row][col]);
      this.grid[row][col].color = newColor;
    }

    if (row > 0) {
      this.DoGameTurn(oldColor, newColor, row - 1, col);
    }

    if (row < 13) {
      this.DoGameTurn(oldColor, newColor, row + 1, col);
    }
    if (col > 0) {
      this.DoGameTurn(oldColor, newColor, row, col - 1);
    }

    if (col < 13) {
      this.DoGameTurn(oldColor, newColor, row, col + 1);
    }
  }

  getButtons(): flowButton[] {
    this.buttons = [];
    for (let index = 0; index < this.cantVirus; index++) {
      this.buttons.push({
        id: index,
        color: this.virus[index].color,
        counter: 0,
      });
    }
    return this.buttons;
  }

  getGrid(): flowTile[][] {
    this.grid = [];
    let rowTile: Array<flowTile> = [];
    let counter = 0;
    let ramdomNumber = 0;

    for (let y = 0; y < this.gridY; y++) {
      rowTile = [];
      for (let x = 0; x < this.gridX; x++) {
        counter++;
        ramdomNumber = Math.floor(Math.random() * this.cantVirus);
        rowTile.push({
          id: counter,
          row: y,
          column: x,
          color: this.virus[ramdomNumber].color,
          virus: this.virus[ramdomNumber],
          life: 25,
        });
      }
      this.grid.push(rowTile);
    }
    return this.grid;
  }

  getVirus(): flowVirus[] {
    for (let index = 0; index < this.cantVirus; index++) {
      this.virus.push({
        id: index,
        name: 'virus 0' + (index + 1).toString,
        color: this.palette[index],
        life: this.cantTurn,
      });
    }
    return this.virus;
  }

  @HostListener('window:resize') onResize() {
    this.calculateGridSize();
  }

  calculateGridSize() {
    if (window.innerHeight * 0.75 > window.innerWidth) {
      this.gridWidthInPx = window.innerWidth;
      this.gridHeightInPx = window.innerWidth;
    } else {
      this.gridWidthInPx = Math.floor(window.innerHeight * 0.75);
      this.gridHeightInPx = Math.floor(window.innerHeight * 0.75);
    }
  }
}


