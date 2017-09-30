
export function print(msg?: string, ...args: Array<any>) {
    if (typeof console.log === "function") {
        console.log(msg, ...args);
    }
}