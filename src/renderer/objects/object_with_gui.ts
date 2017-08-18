declare interface GuiParams {
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  thickness?: number;
  name?: string;
  cornerRadius?: number;

}

export class ObjectWithGUI extends BABYLON.AbstractMesh {

  material: BABYLON.PBRMetallicRoughnessMaterial;

  constructor(public name: string,
              public scene: BABYLON.Scene,
              public guiTexture: BABYLON.GUI.AdvancedDynamicTexture,
              object?: BABYLON.AbstractMesh) {
    super(name, scene);
    if (object != null) {
      Object.assign(object);
      this.material = <BABYLON.PBRMetallicRoughnessMaterial> object.material;
    }

    this.drawGuiRect();
  }
  
  drawGuiRect(params: GuiParams = {
    width: 0.2,
    height: 4,
    color: 'orange',
    thickness: 4,
    background: 'green',
    cornerRadius: 20,
    name: this.name
  }) {
    const rect = new BABYLON.GUI.Rectangle(params.name);
    rect.width = params.width;
    rect.height = params.height;
    rect.cornerRadius = params.cornerRadius;
    rect.color = params.color;
    rect.thickness = params.thickness;
    rect.background = params.background;
    this.guiTexture.addControl(rect);
  }

}
