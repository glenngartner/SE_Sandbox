import * as BabylonCommon from '../common/babylonCommon';
import {
  Line
} from '../logic/line';
import {
  Actor
} from '../logic/actor';

export class Renderer {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;
  private engineAndScene: BabylonCommon.EngineAndScene;
  private beveledCube: BABYLON.AbstractMesh;
  private assetManager: BABYLON.AssetsManager;

  constructor(canvas: HTMLCanvasElement) {
    this.initialize(canvas);
    this.loadModels();
    // this.assetManager.onFinish = () => {
      this.buildScene(canvas);
      this.renderLoop(this.engineAndScene);
      this.playWithThings();
    // };
    this.assetManager.load();
  }

  loadModels() {
    this.assetManager = new BABYLON.AssetsManager(this.scene);
    const loadMesh = this.assetManager.addMeshTask('bCubeLoad', 'Cube', 'assets/', 'cube_scene.babylon');
    this.assetManager.onFinish = function(task){ };
    // this.assetManager.load();
  }

  initialize(canvas: HTMLCanvasElement) {
    this.engineAndScene = BabylonCommon.createEngineAndScene(canvas);
    this.engine = this.engineAndScene.engine;
    this.scene = this.engineAndScene.scene;
  }

  buildScene(canvas: HTMLCanvasElement) {
    this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);
    this.camera = BabylonCommon.createOrbitCamAndAttach(this.scene, canvas, 'cam1');

    const light = new BABYLON.DirectionalLight('sunlight', new BABYLON.Vector3(-1, -1, -1), this.scene);
    // light.intensity = .5;

    const postProcessing = BabylonCommon.addPostProcessingPipeline(this.scene, [this.camera], 'defaultPipeline');

    const line = new Line();
    const actor = new Actor();
    actor.name = 'steve';
    line.addActorToBack(actor);
    const actor2 = new Actor();
    actor2.name = 'carl';
    line.addActorToBack(actor2);
    console.log(`beveledCube: `, this.beveledCube);
  }

  playWithThings() {}

  renderLoop(eAndS: BabylonCommon.EngineAndScene) {
    eAndS.engine.runRenderLoop(() => {
      eAndS.scene.render();
    });
  }
}
