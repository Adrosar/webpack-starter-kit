
export interface Lib {
    print: PrintFunction
}

export interface PrintFunction {
    (msg: string, ...texts: Array<any>): void
}