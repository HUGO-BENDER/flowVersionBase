export interface flowButton{
  id: number;
  color: string;
  counter: number;
  cssClass?: string;
}

export interface flowTile{
  id: number;
  row: number;
  column: number;
  color: string;
  life: number;
  cssClass?: string;
  virus?: flowVirus;
}

export interface flowVirus{
  id: number;
  name: string;
  color: string;
  life: number;
}
