// commonly used functons and tasks for Babylonjs scenes.
// requires Babylonjs be imported as a global script (index.html)
// requires Babylon.d.ts be imported by the Typescript compiler

export interface EngineAndScene {
  engine: BABYLON.Engine;
  scene: BABYLON.Scene;
}

const DEFAULTBASECOLOR: BABYLON.Color3 = BABYLON.Color3.Gray();
const DEFAULTMETALLIC = 0;
const DEFAULTROUGHNESS = .25;

export function createEngineAndScene(canvas: HTMLCanvasElement): EngineAndScene {
  const engine = new BABYLON.Engine(canvas);
  const scene = new BABYLON.Scene(engine);
  return {engine: engine, scene: scene};
}

export function assignPBRMaterial(scene: BABYLON.Scene, baseColor ?: BABYLON.Color3, metallic ?: number, roughness ?: number): BABYLON.PBRMetallicRoughnessMaterial {
  const mat = new BABYLON.PBRMetallicRoughnessMaterial('', scene);
  baseColor != null ? mat.baseColor = baseColor : mat.baseColor = DEFAULTBASECOLOR;
  metallic != null ? mat.metallic = metallic : mat.metallic = DEFAULTMETALLIC;
  roughness != null ? mat.roughness = roughness : mat.roughness = DEFAULTROUGHNESS;
  return mat;
}

export function createOrbitCamAndAttach(scene: BABYLON.Scene, canvas: HTMLCanvasElement, camName: string): BABYLON.ArcRotateCamera{
  const cam = new BABYLON.ArcRotateCamera(camName, 1, .8, 5, new BABYLON.Vector3(0, 0, 0), scene);
  cam.attachControl(canvas);
  return cam;
}

// add post processing pipeline
export function addPostProcessingPipeline(scene: BABYLON.Scene, camera: BABYLON.Camera[], pipelineName: string): BABYLON.DefaultRenderingPipeline {
  const defaultPipeline = new BABYLON.DefaultRenderingPipeline(pipelineName, true, scene, camera);
  defaultPipeline.bloomEnabled = true;
  defaultPipeline.fxaaEnabled = true;
  defaultPipeline.bloomWeight = 0.1;
  defaultPipeline.imageProcessing.vignetteEnabled = true;
  defaultPipeline.imageProcessing.toneMappingEnabled = true;
  return defaultPipeline;
}

// add shadows for a mesh
export function generateShadows(mesh: BABYLON.AbstractMesh, light: BABYLON.DirectionalLight | BABYLON.PointLight) {
  const shadowGen = new BABYLON.ShadowGenerator(256, light);
  shadowGen.getShadowMap().renderList.push(mesh);
  // shadowGen.usePoissonSampling = true;
  shadowGen.useBlurExponentialShadowMap = true;
  shadowGen.forceBackFacesOnly = true;
  // light.autoUpdateExtends = false;
}

// extract a mesh from an export .babylon scene file
export function loadMeshFromSceneFile(meshName: string, sceneURL: string, babylonScene: BABYLON.Scene): BABYLON.AbstractMesh {
  let mesh: BABYLON.AbstractMesh;
  BABYLON.SceneLoader.ImportMesh(meshName, '', sceneURL, babylonScene, (meshes) => {
   mesh = meshes[0];
  });
  return mesh;
}
