
declare interface RequireFunction {
    (path: string): any
}

declare const require: RequireFunction

declare interface BundleLoaderFunction {
    (module: any): void
}
