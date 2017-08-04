import {
  Actor
} from './actor';

export class Line {

  actors: Actor[];
  startLoc: Vector3 = {
    x: 0,
    y: 0,
    z: 0
  };
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
    this.actors.splice(loc - 1, 0, actor); // assume 1 (first in line) is index 0
  }

  removeActorFromFront(): Actor {
    return this.actors.shift();
  }

  removeActorFromBack(): Actor {
    return this.actors.pop();
  }

  removeActorFromThisLocation(loc: number): Actor { // assume 1 (first in line) is index 0
    return this.actors.splice(loc - 1, 1)[0];
  }

  showActorAtPosition(pos: number): Actor { // assume 1 (first in line) is index 0
    return this.actors[pos - 1];
  }

  positionOfActor(actorToFind: Actor): number {
    return this.actors.indexOf(actorToFind);
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
  }

  assignLocationToActor(actor: Actor) {
    if (this.positionOfActor(actor) === 0) {
      actor.position = this.startLoc; // if you're the first actor in line, stand at the line's starting point
    } else {
      const actorInFront = this.actors[this.positionOfActor(actor) - 1]; // get the guy standing in front of you in line
      const myPos: Vector3 = { // a little vector math
        x: actorInFront.position.x - actor.size.x - this.distBetweenActors,
        y: 0, // actorInFront.position.y + actor.size.y + this.distBetweenActors,
        z: 0, // actorInFront.position.z + actor.size.z + this.distBetweenActors,
      };
      actor.position = myPos;

    }
  }

  calcEndOfLine() {
    // TODO
    // based on the start location, number of actors, width of each actor, and the distance between actors
    // we can find the end of the line location, assuming a line vector / direction it's pointed
    // ((this.startLoc) + (this.distanceBetweenActors)) * (this.actors.length - 1)
  }

}
