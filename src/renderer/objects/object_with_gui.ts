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

  public control: BABYLON.GUI.Control;

  constructor(public name: string,
              public guiTexture: BABYLON.GUI.AdvancedDynamicTexture,
              public mesh: BABYLON.AbstractMesh) {
      // this.mesh.material = object.material;

    this.drawGuiRect();
  }

  drawGuiRect(params: GuiParams = {
    width: 0.1,
    height: .05,
    color: 'black',
    thickness: 4,
    background: 'cornflowerblue',
    cornerRadius: 10,
    name: this.name,
    offset: {x: 0, y: -100}
  }) {

    // create rectangle card for placing text on top of
    const rect = new BABYLON.GUI.Rectangle(params.name);
    rect.width = params.width;
    rect.height = params.height;
    rect.cornerRadius = params.cornerRadius;
    rect.color = params.color;
    rect.thickness = params.thickness;
    rect.background = params.background;
    this.guiTexture.addControl(rect);
    this.control = rect;
    this.linkGUI(rect, params.offset);

    // create label
    const label = new BABYLON.GUI.TextBlock();
    label.text = params.name;
    label.color = 'darkblue';
    label.fontSize = 28;
    rect.addControl(label);
  }

  linkGUI(guiObj: BABYLON.GUI.Rectangle, offset: Vector2) {
      guiObj.linkWithMesh(this.mesh);
      guiObj.linkOffsetX = offset.x;
      guiObj.linkOffsetY = offset.y;
  }

}
