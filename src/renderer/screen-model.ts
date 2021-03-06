import { ScreenLogic } from '../logic/screen/screen-logic';
import { BabylonOrbitSun } from './renderer_types/babylon-orbit-sun';
import * as BabylonCommon from '../common/BabylonCommon';

export class ScreenModel extends BabylonOrbitSun {

    private screenLogic: ScreenLogic;
    public pixelGeo: BABYLON.Mesh[] = [];
    private colorGradientFrequency: number = .001;
    private pixelDensity = 10;

constructor(canvas: HTMLCanvasElement, engine: BABYLON.Engine) {
    super(canvas, engine);
    const cam = <BABYLON.ArcRotateCamera>this.scene.activeCamera;
    cam.radius = 5;
    cam.setPosition(new BABYLON.Vector3(-5, 1, -1));
    this.loadModels();
    // this.drawPixels();
}

    loadModels() {
        // const assetManager = new BABYLON.AssetsManager(this.scene);
        BABYLON.SceneLoader.Append('assets/', 'tv.glb', this.scene, (scene) => {
            const topLeftMarker = scene.getMeshByName('topLeftMT');
            const botRightMarker = scene.getMeshByName('bottomRightMT');
        // BABYLON.SceneLoader.Append('assets/', 'tv_tall.glb', this.scene, (scene) => {
        //     const topLeftMarker = scene.getMeshByName('topLeftMT.001');
        //     const botRightMarker = scene.getMeshByName('bottomRightMT.001');
            this.screenLogic = new ScreenLogic(
            {x: topLeftMarker.position.x, y: topLeftMarker.position.y, z: topLeftMarker.position.z},
            {x: botRightMarker.position.x, y: botRightMarker.position.y, z: botRightMarker.position.z},
            this.pixelDensity);
            this.drawPixels();
        });
    }

    drawPixels() { // draw geometry for every pixel in the screen logic
        let i = 0;
        for (const pixel of this.screenLogic.pixels ){
            const box = BABYLON.MeshBuilder.CreateBox(
                `pixelBox` + pixel.id, // give each box a uniqe name, based on it's individual ID
                {}, // don't pass any parameters
                this.scene);
            // const box = BABYLON.MeshBuilder.CreatePlane(
            //     `pixelBox` + pixel.id, // give each box a uniqe name, based on it's individual ID
            //     {}, // don't pass any parameters
            //     this.scene);
            //     box.rotation.set(0, Math.PI / 2, 0);
            box.scaling.z = this.screenLogic.distBetweenPixels / 4; // scale the box in the z direction to fit pixel width
            box.scaling.y = this.screenLogic.distBetweenPixels / 4; // scale the box in the y direction to fit pixel width
            box.scaling.x = .1; // flatten the pixels to they're flush with the screen
            box.position.set(
                pixel.position.x - (box.scaling.x / 2), // offset the box's x position by half it's x width
                pixel.position.y - (box.scaling.y / 2), // offset the box's y position by half it's y width
                pixel.position.z - (box.scaling.z / 2)); // offset the box's z position by half it's z width
            const material = BabylonCommon.assignPBRMaterial(this.scene);
            material.emissiveColor = new BABYLON.Color3(Math.sin(i), Math.cos(i), Math.tan(i));
            box.material = material;
            this.pixelGeo.push(box);
            i += this.colorGradientFrequency;
        }
    }

    changePixelColor(color: number) {
        for (const pixelMesh of this.pixelGeo) {
            const mat = <BABYLON.PBRMetallicRoughnessMaterial>pixelMesh.material;
            mat.emissiveColor = new BABYLON.Color3(Math.sin(color), Math.sin(color), Math.sin(color));
        }
    }

    render() {}
}
