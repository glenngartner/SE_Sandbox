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
  distBetweenActors = 5;

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

  calcEndOfLine() {
    // TODO
    // based on the start location, number of actors, width of each actor, and the distance between actors
    // we can find the end of the line location, assuming a line vector / direction it's pointed
    // ((this.startLoc) + (this.distanceBetweenActors)) * (this.actors.length - 1)
  }

}
