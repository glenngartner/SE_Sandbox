import * as BabylonCommon from '../../common/BabylonCommon';
import { Actor } from '../../logic/line/actor';

export class BasicBabylonRenderer implements BabylonRenderer {
    public scene: BABYLON.Scene;
    private engine: BABYLON.Engine;

    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
        this.scene = new BABYLON.Scene(engine);
        this.engine = engine;
    }

    // this will append a scene from a file, and call the afterLoad() method when loading is complete
    appendScene(root: string, fileName: string) {
        // const assetManager = new BABYLON.AssetsManager(this.scene);
        BABYLON.SceneLoader.Append(root, fileName, this.scene, () => {
            this.afterLoad();
        });
        // assetManager.onFinish = this.afterLoad;
    }

    afterLoad() {}

    removeActor(actor: Actor) {}

    render() {}
}
