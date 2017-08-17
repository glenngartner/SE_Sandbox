import {
  BabylonOrbitSun
} from './renderer_types/babylon-orbit-sun';

export class Queue extends BabylonOrbitSun {

  plane: BABYLON.AbstractMesh;

  constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);

    this.appendScene('assets/queue/', 'plane.glb');
  }

  afterLoad() {
    console.log('plane mesh loaded:', this.scene.getMeshByName('Plane'));
    this.plane = this.scene.getMeshByName('Plane');
    this.drawGUI();
  }

  drawGUI() {
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('gui1');
    const rect1 = new BABYLON.GUI.Rectangle();
    rect1.width = 0.2;
    rect1.height = '40px';
    rect1.cornerRadius = 20;
    rect1.color = 'Orange';
    rect1.thickness = 4;
    rect1.background = 'green';
    advancedTexture.addControl(rect1);

    const label = new BABYLON.GUI.TextBlock();
    label.text = this.plane.name;
    rect1.addControl(label);

    rect1.linkWithMesh(this.plane);
    rect1.linkOffsetY = -50;
  }

}
