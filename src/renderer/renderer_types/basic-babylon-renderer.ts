export class BasicBabylonRenderer implements BabylonRenderer {
    public scene: BABYLON.Scene;
    private engine: BABYLON.Engine;

    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        this.scene = new BABYLON.Scene(engine);
        this.engine = engine;
    }
}
