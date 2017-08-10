import { BabylonOrbitSun } from './renderer_types/babylon-orbit-sun';
export class ScreenModel extends BabylonOrbitSun {

constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
    const box = BABYLON.MeshBuilder.CreateBox('box1', {size: 1}, this.scene);
}
}
