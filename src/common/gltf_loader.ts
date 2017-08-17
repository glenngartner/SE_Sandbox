import * as BabylonCommon from './BabylonCommon';

export class GLTFLoader {

    private engine: BABYLON.Engine;
    private scene: BABYLON.Scene;

    constructor(eAndS: BabylonCommon.EngineAndScene) {
        this.engine = eAndS.engine;
        this.scene = eAndS.scene;
        this.loadScene();
    }

    loadScene() {
        // this.scene.useRightHandedSystem = true;
        // BABYLON.SceneLoader.ImportMesh(['Tectured_Sphere'], '../assets/', '01_textured_sphere.gltf', this.scene, (scene) => {
        //     console.log('gltf info', scene);
        // });
        BABYLON.SceneLoader.ImportMesh(['Cube'], '../assets/', 'beveled_cube.gltf', this.scene, (meshes) => {
            console.log('gltf import mesh:', meshes[0]);
            meshes[0].material = BabylonCommon.assignPBRMaterial(this.scene, BABYLON.Color3.Red());
        });
        // BABYLON.SceneLoader.Append('../assets/', 'beveled_cube.gltf', this.scene);
        //     console.log('gltf info', this.scene);
    }
}
