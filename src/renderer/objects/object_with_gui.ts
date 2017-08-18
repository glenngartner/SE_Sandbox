import { BabylonOrbitSun } from '../renderer_types/babylon-orbit-sun';
declare interface GuiParams {
  width?: number;
  height?: number;
  color?: string;
  background?: string;
  thickness?: number;
  name?: string;
  cornerRadius?: number;
  offset?: Vector2;
}

export class ObjectWithGUI {

  mesh: BABYLON.AbstractMesh;

  constructor(public name: string,
              public guiTexture: BABYLON.GUI.AdvancedDynamicTexture,
              object: BABYLON.AbstractMesh) {
      this.mesh = object;
      this.mesh.material = object.material;

    this.drawGuiRect();
  }

  drawGuiRect(params: GuiParams = {
    width: 0.2,
    height: .1,
    color: 'orange',
    thickness: 4,
    background: 'green',
    cornerRadius: 20,
    name: this.name,
    offset: {x: 0, y: -100}
  }) {
    const rect = new BABYLON.GUI.Rectangle(params.name);
    rect.width = params.width;
    rect.height = params.height;
    rect.cornerRadius = params.cornerRadius;
    rect.color = params.color;
    rect.thickness = params.thickness;
    rect.background = params.background;
    this.guiTexture.addControl(rect);
    this.linkGUI(rect, params.offset);
  }

  linkGUI(guiObj: BABYLON.GUI.Rectangle, offset: Vector2) {
      guiObj.linkWithMesh(this.mesh);
      guiObj.linkOffsetX = offset.x;
      guiObj.linkOffsetY = offset.y;
  }

}
