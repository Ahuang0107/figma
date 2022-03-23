export class Matrix {
    public array: Float32Array | null = null;

    constructor(
        public a: number = 1,
        public b: number = 0,
        public c: number = 0,
        public d: number = 1,
        public tx: number = 0,
        public ty: number = 0
    ) {
    }

    toArray(transpose: boolean, out?: Float32Array): Float32Array {
        if (!this.array) {
            this.array = new Float32Array(9);
        }
        const array = out || this.array
        if (transpose) {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = 0;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        } else {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = this.tx;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }

        return array
    }
}
