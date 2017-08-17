import { BabylonOrbitSun } from './renderer_types/babylon-orbit-sun';
import * as BabylonCommon from '../common/BabylonCommon';
import { Line } from '../logic/line/line';
import { Actor } from '../logic/line/actor';

export class SimpleLine extends BabylonOrbitSun {
  private camera: BABYLON.Camera;
  private engineAndScene: BabylonCommon.EngineAndScene;
  private assetManager: BABYLON.AssetsManager;
  private actionManager: BABYLON.ActionManager;
  private line: Line;
  private mat: BABYLON.PBRMetallicRoughnessMaterial;
  private env: BABYLON.CubeTexture;

  constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
    this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);
    this.loadModels();
    this.assetManager.onFinish = () => {
      this.playWithThings();
      this.loadAnimMesh();
    };
  }

  loadModels() {
    this.assetManager = new BABYLON.AssetsManager(this.scene);
    this.assetManager.addMeshTask('bCubeLoad', 'Cube', 'assets/', 'cube_scene.babylon');
    this.assetManager.addMeshTask('animCubeTask', 'animCube', 'assets/', 'animated_cube.babylon');
    this.mat = new BABYLON.PBRMetallicRoughnessMaterial('mat1', this.scene);
    this.mat.baseTexture = new BABYLON.Texture('../assets/mesh_source_Material_color.png', this.scene);
    this.mat.metallicRoughnessTexture = new BABYLON.Texture('../assets/mesh_source_Material_met_rough.png', this.scene);
    // this.scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('../assets/countrySpecularHDR.dds', this.scene);
    this.assetManager.load();
  }

  loadAnimMesh() {
    const animMesh = this.scene.getMeshByName('animCube');
    animMesh.actionManager = new BABYLON.ActionManager(this.scene);
    animMesh.material = this.mat;
    console.log(`animMesh animations: `, animMesh.animations);
    this.executeCodeOnAction(animMesh, BABYLON.ActionManager.OnPointerOverTrigger, () => {
      console.log('animation begins now!!');
      this.scene.beginAnimation(animMesh, 0, 60, false);
    });
  }

  playWithThings() {
    this.line = new Line();
    this.createActors(this.line);
    const cubeGeneric = this.scene.getMeshByName('Cube');
    cubeGeneric.scaling = new BABYLON.Vector3(.5, .5, .5);
    cubeGeneric.isVisible = false;
    cubeGeneric.material = BabylonCommon.assignPBRMaterial(this.scene, BABYLON.Color3.Red());
    this.createMeshForEachActor(this.line.actors, cubeGeneric);
  }

  createActors(line: Line) {
    const actor1 = line.addNewActor('steve');
    const actor2 = line.addNewActor('carl');
    const actor3 = line.addNewActor('rachel');
    const actor4 = line.addNewActor('tom');
    const actor5 = line.addNewActor('mary');
    const actor6 = line.addNewActor('butch');
    line.updateLocationOfAllActors();
  }

  executeCodeOnAction(mesh: BABYLON.AbstractMesh, trigger: any, callback: (evt: BABYLON.ActionEvent) => void) {
    mesh.actionManager.registerAction(
      new BABYLON.ExecuteCodeAction(trigger, callback));
  }

  createMeshForEachActor(actors: Actor[], srcMesh: BABYLON.AbstractMesh) {
    for (const actor of actors) {
      const mesh = srcMesh.clone(actor.name);
      mesh.isVisible = true; // make visible, since source mesh is hidden
      mesh.actionManager = new BABYLON.ActionManager(this.scene); // add action manager to each mesh
      mesh.actionManager.registerAction( // register a mouseover action to each mesh
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,
          () => {
            mesh.outlineWidth = .1;
            mesh.outlineColor = BABYLON.Color3.Yellow();
            mesh.renderOutline = true;
            mesh.scaling.set(.6, .6, .6);
            console.log(`${mesh.name} is number ${this.line.positionOfActor(actor) + 1} in line`);
          }
        ));
      mesh.actionManager.registerAction( // register a mouse out event
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,
          () => {
            mesh.renderOutline = false;
            mesh.scaling.set(.5, .5, .5);
          }
        ));
      mesh.material = BabylonCommon.assignPBRMaterial(this.scene, new BABYLON.Color3(Math.random(), Math.random(), Math.random()));
      mesh.position.set(actor.position.x, actor.position.y, actor.position.z);
    }
  }

}
