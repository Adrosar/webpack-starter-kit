
type BundleLoaderFunction = {
    (module: any): void
}

type PrintFunction = {
    (msg: string, ...texts: Array<any>): void
}

type Lib = {
    print: PrintFunction
}
