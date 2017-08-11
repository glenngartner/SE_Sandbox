interface Vector3 {
    x: number;
    y: number;
    z: number;
}

interface BabylonRenderer {
    scene: BABYLON.Scene;
    render(num: number); 
}