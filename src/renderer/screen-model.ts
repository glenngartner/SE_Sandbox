import { ScreenLogic } from '../logic/screen/screen';
import { BabylonOrbitSun } from './renderer_types/babylon-orbit-sun';
import * as BabylonCommon from '../common/BabylonCommon';

export class ScreenModel extends BabylonOrbitSun {

constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
    const screen = new ScreenLogic(10, 7);
    for (const pixel of screen.pixelRow){
        const box = BABYLON.MeshBuilder.CreateBox(`pixelBox` + pixel.id, {size: pixel.size.x  / 1.1}, this.scene);
        box.position.set(pixel.position.x, pixel.position.y, pixel.position.z);
        box.material = BabylonCommon.assignPBRMaterial(this.scene);
    }
}
}
