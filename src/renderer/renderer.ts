import * as BabylonCommon from '../common/babylonCommon';

export class Renderer {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;
  private engineAndScene: BabylonCommon.EngineAndScene;

  constructor(canvas: HTMLCanvasElement) {
    this.initialize(canvas);
    this.buildScene(canvas);
    this.renderLoop(this.engine);
  }

  initialize(canvas: HTMLCanvasElement) {
    this.engineAndScene = BabylonCommon.createEngineAndScene(canvas);
    this.engine = this.engineAndScene.engine;
    this.scene = this.engineAndScene.scene;
  }

  buildScene(canvas: HTMLCanvasElement) {
    this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);
    this.camera = BabylonCommon.createOrbitCamAndAttach(this.scene, canvas, 'cam1');

    let light = new BABYLON.DirectionalLight('sunlight', new BABYLON.Vector3(-1, -1, -1), this.scene);
    light.intensity = .5;

    let beveledCube = BabylonCommon.loadMeshFromSceneFile('Cube', 'assets/cube_scene.babylon', this.scene);
    let postProcessing = BabylonCommon.addPostProcessingPipeline(this.scene, [this.camera], 'defaultPipeline');
  }

  renderLoop(engine: BABYLON.Engine) {
    engine.runRenderLoop(() => {
      this.scene.render();
    })
  }
}
