import * as BABYLON from 'babylonjs';
/**
 * Created by glenn on 7/28/2017.
 */

export class Renderer {
  private engine: BABYLON.Engine;
  private scene: BABYLON.Scene;
  private camera: BABYLON.Camera;

  constructor(canvas: HTMLCanvasElement){
    this.engine = new BABYLON.Engine(canvas);
    this.scene = new BABYLON.Scene(this.engine);
    this.buildScene(canvas);
    this.renderLoop(this.engine);
  }

  buildScene(canvas: HTMLCanvasElement){
      this.scene.clearColor = new BABYLON.Color4(1, 1, 1, 0);
      this.camera = new BABYLON.ArcRotateCamera('cam1', 1, .8, 5, new BABYLON.Vector3(0, 0, 0), this.scene);
      this.camera.attachControl(canvas);

      let light = new BABYLON.DirectionalLight('sunlight', new BABYLON.Vector3(-1, -1, -1), this.scene);
      light.intensity = .5;

      let box = BABYLON.MeshBuilder.CreateBox('box1', {
          size: 1
      }, this.scene);
  }

  renderLoop(engine: BABYLON.Engine) {
      engine.runRenderLoop(() => {
          this.scene.render();
      })
  }
}
