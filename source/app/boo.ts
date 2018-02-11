
export class Boo {
    private _name: string | null

    constructor(name?: string) {
        if (!!name) {
            this._name = name
        } else {
            this._name = null;
        }
    }

    public getName(): string | null {
        return this._name;
    }
}