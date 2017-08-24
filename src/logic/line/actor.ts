

export class Actor implements Actor {
    private static instances = 0;
    public instance: number;
    public name: string;
    public size: Vector3 = {x: 1, y: 1, z: 1};
    public position: Vector3;

    constructor() {
        Actor.instances++; // auto-increment static ID when instantiated
        this.instance = Actor.instances; // auto-assign an instance ID when instantiated
    }
}
