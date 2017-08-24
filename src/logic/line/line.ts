import { Actor } from './actor';

export class Line {

  actors: Actor[];
  startLoc: Vector3 = {x: 4, y: 0, z: 0};
  endLoc: Vector3;
  distBetweenActors = 0.5;

  constructor() {
    this.actors = [];
  }

  addActorToFront(actor: Actor) {
    this.actors.unshift(actor);
  }

  addActorToBack(actor: Actor) {
    this.actors.push(actor);
  }

  addActorToThisLocation(actor: Actor, loc: number) {
    this.actors.splice(loc, 0, actor); // assume 1 (first in line) is index 0
  }

  removeActorFromFront(): Actor {
    return this.actors.shift();
  }

  removeActorFromBack(): Actor {
    return this.actors.pop();
  }

  removeActorFromThisLocation(loc: number): Actor { // assume 1 (first in line) is index 0
    return this.actors.splice(loc, 1)[0];
  }

  showActorAtPosition(pos: number): Actor { // assume 1 (first in line) is index 0
    return this.actors[pos];
  }

  positionOfActor(actorToFind: Actor): number {
    return this.actors.indexOf(actorToFind);
  }

  removeActorByName(actorToFind: Actor) {
    const position = this.positionOfActor(actorToFind);
    this.removeActorFromThisLocation(position);
  }

  addNewActor(name: string): Actor {
    const actor = new Actor();
    actor.name = name;
    this.addActorToBack(actor);
    return actor;
  }

  updateLocationOfAllActors() {
    for (const actor of this.actors) {
      this.assignLocationToActor(actor);
    }
    this.calcEndOfLine();
  }

  assignLocationToActor(actor: Actor) {
    if (this.positionOfActor(actor) === 0) {
      actor.position = this.startLoc; // if you're the first actor in line, stand at the line's starting point
    } else {
      const actorInFront = this.actors[this.positionOfActor(actor) - 1]; // get the guy standing in front of you in line
      const myPos: Vector3 = { // a little vector math
        x: actorInFront.position.x - actor.size.x - this.distBetweenActors, // line up in x direction
        y: 0, // actorInFront.position.y + actor.size.y + this.distBetweenActors, // enable to line up in y direction
        z: 0, // actorInFront.position.z + actor.size.z + this.distBetweenActors, // enable to line up in z direction
      };
      actor.position = myPos;

    }
  }

  // find the vector3 position of the last actor in line
  calcEndOfLine(): Vector3 {
    const positionOfLastInLine = this.actors[this.actors.length - 1].position;
    this.endLoc = positionOfLastInLine;
    return positionOfLastInLine;
  }

}
