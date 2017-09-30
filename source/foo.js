
export class Foo {
    constructor(name = null) {
        this._name = name;
    }

    getName() {
        return this._name;
    }
}