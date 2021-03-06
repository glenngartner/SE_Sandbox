﻿import { SimpleLine } from './simple-line';
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

  addActor(name: string, location: string) {
    for (const lineActor of this.line.actors) {
      if (lineActor.name === name) {
        alert('That name already exists. Please choose another');
        return;
      }
    }
    const actor = new Actor();
    actor.name = name;
    if (location === 'front') this.line.addActorToFront(actor);
    if (location === 'back') this.line.addActorToBack(actor);
    this.line.updateLocationOfAllActors();
    this.createMeshForEachActor([actor], this.beveledCube);
    this.guiTags.push(new ObjectWithGUI(actor.name, this.advancedTexture, this.scene.getMeshByName(actor.name)));
    this.resetMeshPositions();
    // this.createMeshForEachActor(this.line.actors, this.beveledCube);
    // this.assignNameTag();
    console.log(`${name} added to front. New List: `, this.line.actors);
  }

  resetMeshPositions() {
    for (const lineActor of this.line.actors){
      this.scene.getMeshByName(lineActor.name).position.set(lineActor.position.x, lineActor.position.y, lineActor.position.z);
    }
  }

  removeActor(actor: Actor) {
    console.log(`removed ${actor.name} from line`);
    this.line.removeActorByName(actor);
    this.scene.getMeshByName(actor.name).dispose();
    // for (const tag of this.guiTags){
      this.advancedTexture.dispose();
    // }
    this.line.updateLocationOfAllActors();
    this.resetMeshPositions();
    this.drawGUI();
    this.assignNameTag();
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
