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
  private assetManager: BABYLON.AssetsManager;
  private line: Line;

  constructor(canvas: HTMLCanvasElement) {
    this.initialize(canvas);
    this.loadModels();
    this.assetManager.onFinish = () => {
      this.buildScene(canvas);
      this.renderLoop(this.engineAndScene);
      this.playWithThings();
    };
  }

  loadModels() {
    this.assetManager = new BABYLON.AssetsManager(this.scene);
    const loadMesh = this.assetManager.addMeshTask('bCubeLoad', 'Cube', 'assets/', 'cube_scene.babylon');
    this.assetManager.load();
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

    this.line = new Line();
    const actor1 = this.line.addNewActor('steve');
    const actor2 = this.line.addNewActor('carl');
    const actor3 = this.line.addNewActor('rachel');
    const actor4 = this.line.addNewActor('tom');
    const actor5 = this.line.addNewActor('mary');
    const actor6 = this.line.addNewActor('butch');
    this.line.updateLocationOfAllActors();
    // this.scene.debugLayer.show();
  }

  playWithThings() {
    const cubeGeneric = this.scene.getMeshByName('Cube');
    cubeGeneric.scaling = new BABYLON.Vector3(.5, .5, .5);
    cubeGeneric.isVisible = false;
    cubeGeneric.material = BabylonCommon.assignPBRMaterial(this.scene, BABYLON.Color3.Red());
    // const meshes: BABYLON.AbstractMesh[] = [];
    for (const actor of this.line.actors){
      // const mesh = BABYLON.MeshBuilder.CreateBox(actor.name, {size: actor.size.x}, this.scene);
      const mesh = new BABYLON.InstancedMesh(actor.name, <BABYLON.Mesh>cubeGeneric);
      mesh.position.set(actor.position.x, actor.position.y, actor.position.z);
      // meshes.push(mesh);
    }
  }

  renderLoop(eAndS: BabylonCommon.EngineAndScene) {
    eAndS.engine.runRenderLoop(() => {
      eAndS.scene.render();
    });
  }
}
