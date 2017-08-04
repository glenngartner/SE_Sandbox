

export class Actor {
    static instances: number = 0;
    public instance: number;
    public name: string;
    private size: Vector3;
    public position: Vector3;

    constructor(){
        Actor.instances++;
        this.instance = Actor.instances;
    }
}