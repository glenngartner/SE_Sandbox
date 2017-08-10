import { BasicBabylonRenderer } from './basic-babylon-renderer';
export class ScreenModel extends BasicBabylonRenderer {

constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
}
}
