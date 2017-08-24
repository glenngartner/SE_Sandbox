import { SimpleLine } from './simple-line';
import { ObjectWithGUI } from './objects/object_with_gui';
import { BabylonOrbitSun } from './renderer_types/babylon-orbit-sun';
import { Actor } from '../logic/line/actor';
import * as BabylonCommon from '../common/BabylonCommon';

export class Queue extends SimpleLine {

  plane: BABYLON.AbstractMesh;
  advancedTexture: BABYLON.GUI.AdvancedDynamicTexture;
  guiTags: ObjectWithGUI[];

  constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
    this.guiTags = [];
    this.orbitCam.setPosition(new BABYLON.Vector3(0, 0, 6));
    this.orbitCam.wheelPrecision = 25;

    // this.appendScene('assets/queue/', 'plane.glb');
  }

  afterLoad() {
    // console.log('plane mesh loaded:', this.scene.getMeshByName('Plane'));
    // this.plane = this.scene.getMeshByName('Plane');
    this.drawGUI();
    this.assignNameTag();
    // const cube = BABYLON.MeshBuilder.CreateBox('cube1', {size: 1}, this.scene);
    // const cubeWGui = new ObjectWithGUI('cubeWGui', this.advancedTexture, cube);
    // this.meshes.push(cubeWGui);
  }

  drawGUI() {
    this.advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI('gui1');
  }

  removeActor(actor: Actor) {
    console.log(`removed ${actor.name} from line`);
    this.line.removeActorByName(actor);
    this.scene.getMeshByName(actor.name).dispose();
    for (const tag of this.guiTags){
      if (tag.name === actor.name) this.advancedTexture.removeControl(tag.control);
    }
    console.log(`actor list: `, this.line.actors);
  }

  assignNameTag() {
    for (let i = this.line.actors.length - 1; i >= 0; i-- ) {
      const mesh = this.scene.getMeshByName(this.line.actors[i].name);
      const guiNameTag = new ObjectWithGUI(mesh.name, this.advancedTexture, mesh);
      this.guiTags.push(guiNameTag);
    }
  }

  render() {
  }

}
