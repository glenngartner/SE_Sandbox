interface Color {
    r: number;
    g: number;
    b: number;
}

export class Pixel {
    static count: number = 1;
    id: number;
    color: Color = {r: 1, g: 1, b: 1};
    position: Vector3 = {x: 0, y: 0, z: 0};
    size: Vector3 = {x: 1, y: 1, z: 1};

    constructor() {
        this.id = Pixel.count;
        Pixel.count ++; // increment the pixel ID for every pixel created
    }
}
