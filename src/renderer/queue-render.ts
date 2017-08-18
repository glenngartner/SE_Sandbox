import { SimpleLine } from './simple-line';
import { ObjectWithGUI } from './objects/object_with_gui';
import {
  BabylonOrbitSun
} from './renderer_types/babylon-orbit-sun';

export class Queue extends SimpleLine {

  plane: BABYLON.AbstractMesh;
  advancedTexture: BABYLON.GUI.AdvancedDynamicTexture;
  meshes: ObjectWithGUI[];

  constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
    this.meshes = [];

    // this.appendScene('assets/queue/', 'plane.glb');
  }

  afterLoad() {
    console.log('plane mesh loaded:', this.scene.getMeshByName('Plane'));
    this.plane = this.scene.getMeshByName('Plane');
    this.drawGUI();
    // const cube = BABYLON.MeshBuilder.CreateBox('cube1', {size: 1}, this.scene);
    // const cubeWGui = new ObjectWithGUI('cubeWGui', this.advancedTexture, cube);
    // this.meshes.push(cubeWGui);
  }

  drawGUI() {
    this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('gui1');
  }

  render() {
    // for (const object of this.meshes){
    //   object.mesh.rotation.y += 0.05;
    // }
  }

}
