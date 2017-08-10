import { Pixel } from './pixel';
export class ScreenLogic {
    private pixelsPerUnit: number = 1;
    public pixelGap: number = 10;
    public topLeftCorner: Vector3 = {x: -5, y: 2, z: 0};
    pixelRows: Pixel[][] = [];
    pixelRow: Pixel[] = [];

    constructor(public width: number, public height: number, pixelsPerUnit?: number) {
        pixelsPerUnit != null ? this.pixelsPerUnit = pixelsPerUnit : this.pixelsPerUnit = 1;
        this.drawRow();
    }

    drawPixels() {

    }

    drawRow() {
        const pixelsToDraw = this.width; // * this.pixelsPerUnit;
        for (let i = 0; i < pixelsToDraw; i ++) {
            const pixel = new Pixel();
            pixel.position.x = this.topLeftCorner.x + i;
            this.pixelRow.push(pixel);
            // debugger;
        }
        
    }

    drawColumn() {}
}
