import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {SimpleLine} from '../renderer/simple-line';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'app';
  threeDApp: BabylonRenderer;

  @ViewChild('renderCanvas')
  canvas: HTMLCanvasElement;

  constructor() {}

  ngAfterViewInit() {
    const element = <HTMLCanvasElement>document.getElementById('renderCanvas');
     this.threeDApp = new SimpleLine(element);
  }
}
