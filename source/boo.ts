
export class Boo {
    private _name: string

    constructor(name: string = null) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }
}