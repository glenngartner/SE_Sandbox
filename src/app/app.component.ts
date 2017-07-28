import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {Renderer} from '../renderer/renderer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'app';
  renderer: Renderer;

  @ViewChild('renderCanvas')
  canvas: HTMLCanvasElement;

  constructor(){
    // this.renderer = new Renderer(this.canvas);
  }

  ngAfterViewInit(){
    let element = <HTMLCanvasElement>document.getElementById('renderCanvas');
     this.renderer = new Renderer(element);
  }
}
