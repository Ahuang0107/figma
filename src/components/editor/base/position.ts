export class Position {
    constructor(
        public left: number = 0,
        public right: number = 0,
        public top: number = 0,
        public bottom: number = 0
    ) {
    }

    multiplyScale(scale: number): Position {
        this.left *= scale;
        this.right *= scale;
        this.top *= scale;
        this.bottom *= scale;
        return this
    }
}
