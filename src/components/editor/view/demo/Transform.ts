import {Matrix} from "./Matrix";

export class Transform {
    constructor(
        public worldTransform: Matrix = new Matrix(),
        public localTransform: Matrix = new Matrix(),
    ) {

    }
}
