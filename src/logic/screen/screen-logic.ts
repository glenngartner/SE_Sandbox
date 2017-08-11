import { Pixel } from './pixel';
import * as BabylonCommon from '../../common/BabylonCommon';

export class ScreenLogic {
    public distBetweenPixels: number;
    private screenDiagonal: number;
    private screenExtents: Vector3 = {x: null, y: null, z: null};
    pixelRows: Pixel[][] = [];
    pixelRow: Pixel[] = [];

    constructor(public topLeftCorner: Vector3, public bottomRightCorner: Vector3, public pixelsPerUnit: number, ) {
        this.calculateScreenExtents();
        this.drawRow();
        this.screenDiagonal = BabylonCommon.euclidianDistanceBetweenVec3Points(topLeftCorner, bottomRightCorner);
        this.calculateScreenExtents();
        this.distBetweenPixels = this.screenExtents.z / pixelsPerUnit;
    }

    drawPixels() {

    }

    calculateScreenExtents() {
        this.screenExtents.x = Math.abs(this.topLeftCorner.x - this.bottomRightCorner.x);
        this.screenExtents.y = Math.abs(this.topLeftCorner.y - this.bottomRightCorner.y);
        this.screenExtents.z = Math.abs(this.topLeftCorner.z - this.bottomRightCorner.z);
    }

    drawRow() {
        const pixelsToDraw = this.screenExtents.z * this.pixelsPerUnit;
        const startHeight = this.topLeftCorner.y;
        for (let i = 0; i < pixelsToDraw; i ++) {
            const pixel = new Pixel();
            pixel.position.y = startHeight;
            pixel.position.z = (this.topLeftCorner.z - i) / this.pixelsPerUnit;
            this.pixelRow.push(pixel);
        }
    }

    drawColumn() {}
}
