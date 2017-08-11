import { Pixel } from './pixel';
import * as BabylonCommon from '../../common/BabylonCommon';

export class ScreenLogic {
    public distBetweenPixels: number;
    private screenDiagonal: number;
    private screenExtents: Vector3 = {x: null, y: null, z: null};
    pixels: Pixel[] = [];

    constructor(public topLeftCorner: Vector3, public bottomRightCorner: Vector3, public pixelsPerUnit: number, ) {
        this.calculateScreenExtents();
        this.screenDiagonal = BabylonCommon.euclidianDistanceBetweenVec3Points(topLeftCorner, bottomRightCorner);
        this.distBetweenPixels = this.screenExtents.z / pixelsPerUnit;
        this.drawRows();
    }

    drawPixels() {

    }

    calculateScreenExtents() {
        this.screenExtents.x = Math.abs(this.topLeftCorner.x - this.bottomRightCorner.x);
        this.screenExtents.y = Math.abs(this.topLeftCorner.y - this.bottomRightCorner.y);
        this.screenExtents.z = Math.abs(this.topLeftCorner.z - this.bottomRightCorner.z);
    }

    drawRows() { // determine the height to begin drawing a row, then ask drawRow() to do its thing
        const unitsHigh = this.screenExtents.y * this.pixelsPerUnit;
        for (let y = this.topLeftCorner.y; y > this.bottomRightCorner.y; y -= this.screenExtents.y / unitsHigh) {
            console.log('y is: ', y);
            this.drawRow(y);
        }
    }

    drawRow(height: number) {
        const unitsAcross = this.screenExtents.z * this.pixelsPerUnit;
        for (let z = this.topLeftCorner.z; z > this.bottomRightCorner.z; z -= this.screenExtents.z / unitsAcross) {
            const pixel = new Pixel();
            pixel.position.y = height;
            pixel.position.z = z;
            this.pixels.push(pixel);
        }
        // for (let i = 0; i < unitsAcross; i ++) {
        //     const pixel = new Pixel();
        //     pixel.position.y = height;
        //     pixel.position.z = (this.topLeftCorner.z - i) / this.pixelsPerUnit;
        //     this.pixels.push(pixel);
        // }
    }

    drawColumn() {}
}
