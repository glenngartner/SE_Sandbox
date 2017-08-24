declare interface Vector2 {
    x: number;
    y: number;
}

declare interface Vector3 extends Vector2 {
    z: number;
}

declare interface BabylonRenderer {
    scene: BABYLON.Scene;
    line?: LineInterface;
    addActor(name: string, location: string);
    removeActor(actor: ActorInterface);
    render(num?: number); 
}

declare interface LineInterface {
    actors: ActorInterface[];
}

declare interface ActorInterface {
    instance: number;
    name: string;
    size: Vector3;
    position: Vector3;
}

declare interface ControlList {
    name: string;
    control: BABYLON.GUI.Control;
  }