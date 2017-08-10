import { BasicBabylonRenderer } from './basic-babylon-renderer';
import * as BabylonCommon from '../../common/BabylonCommon';

export class BabylonOrbitSun extends BasicBabylonRenderer {

    private orbitCam: BABYLON.Camera;
    private sunlight: BABYLON.DirectionalLight;

    constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine){
        super(canvas, engine);
        this.orbitCam = BabylonCommon.createOrbitCamAndAttach(this.scene, canvas, 'cam1');
        this.sunlight = new BABYLON.DirectionalLight('sunlight', new BABYLON.Vector3(-1, -1, -1), this.scene);
        BabylonCommon.addPostProcessingPipeline(this.scene, [this.orbitCam], 'defaultPipeline');
        this.scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData('../../assets/countrySpecularHDR.dds', this.scene);
    }
}
