import * as BabylonCommon from '../common/BabylonCommon';
import {
  Line
} from '../logic/line';
import {
  Actor
} from '../logic/actor';
import {
  GLTFLoader
} from './gltf_loader';

export class Renderer {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;
  private engineAndScene: BabylonCommon.EngineAndScene;
  private assetManager: BABYLON.AssetsManager;
  private actionManager: BABYLON.ActionManager;
  private line: Line;

  constructor(canvas: HTMLCanvasElement) {
    this.initialize(canvas);
    // const gltFLoad = new GLTFLoader(this.engineAndScene);
    this.loadModels();
    this.assetManager.onFinish = () => {
      this.buildScene(canvas);
      this.renderLoop(this.engineAndScene);
      this.playWithThings();
      this.loadAnimMesh();
    };
    // this.scene.debugLayer.show();
  }

  loadModels() {
    this.assetManager = new BABYLON.AssetsManager(this.scene);
    const loadMesh = this.assetManager.addMeshTask('bCubeLoad', 'Cube', 'assets/', 'cube_scene.babylon');
    // const loadMesh2 = this.assetManager.addMeshTask('bCubeAnimLoad', 'cube_anim', 'assets/', 'animated_cube.babylon');
    // const loadgltf = this.assetManager.addMeshTask('loadGltf', 'cube_anim', 'assets/', 'animated_cube.babylon');
    const loadMesh2 = this.assetManager.addMeshTask('animCubeTask', 'animCube', 'assets/', 'animated_cube.babylon');
    this.assetManager.load();
  }

  loadAnimMesh() {
    const animMesh = this.scene.getMeshByName('animCube');
    // debugger;
    animMesh.actionManager = new BABYLON.ActionManager(this.scene);
    console.log(`animMesh animations: `, animMesh.animations);
    this.executeCodeOnAction(animMesh, BABYLON.ActionManager.OnPointerOverTrigger, () => {
      console.log('animation begins now!!');
      this.scene.beginAnimation(animMesh, 0, 60, false);
    });
  }

  initialize(canvas: HTMLCanvasElement) {
    this.engineAndScene = BabylonCommon.createEngineAndScene(canvas);
    this.engine = this.engineAndScene.engine;
    this.scene = this.engineAndScene.scene;
    this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);
    // this.scene.debugLayer.show();
  }

  buildScene(canvas: HTMLCanvasElement) {
    this.camera = BabylonCommon.createOrbitCamAndAttach(this.scene, canvas, 'cam1');
    const light = new BABYLON.DirectionalLight('sunlight', new BABYLON.Vector3(-1, -1, -1), this.scene);
    const postProcessing = BabylonCommon.addPostProcessingPipeline(this.scene, [this.camera], 'defaultPipeline');
  }

  playWithThings() {
    this.line = new Line();
    this.createActors(this.line);
    // this.scene.debugLayer.show();
    const cubeGeneric = this.scene.getMeshByName('Cube');
    cubeGeneric.scaling = new BABYLON.Vector3(.5, .5, .5);
    cubeGeneric.isVisible = false;
    cubeGeneric.material = BabylonCommon.assignPBRMaterial(this.scene, BABYLON.Color3.Red());
    this.createMeshForEachActor(this.line.actors, cubeGeneric);

    // const cubeAnim = this.scene.getMeshByName('cube_anim');
    // cubeAnim.actionManager = new BABYLON.ActionManager(this.scene);
    // this.executeCodeOnAction(cubeAnim, BABYLON.ActionManager.OnPointerOverTrigger, () => {
    //   console.log(`over cubeAnim`);
    //   // cubeAnim.material.co
    // });
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

  renderLoop(eAndS: BabylonCommon.EngineAndScene) {
    eAndS.engine.runRenderLoop(() => {
      eAndS.scene.render();
    });
  }
}
