
require("./index.html");
require("./style.css");

import { Foo } from "./foo";
import { Boo } from "./boo";

const loadLib: BundleLoaderFunction = require("bundle-loader?lazy&name=app/lib!./lib.ts");

let foo: Foo = new Foo();
let boo: Boo = new Boo("Boo");

console.log("> Foo:", foo.getName());
console.log("> Boo:", boo.getName());

setTimeout(() => {
    // Przykład pokazujący jak funkcja `loadLib` ładuje plik `lib.js` w chwili jej wywołania.
    loadLib((lib: Lib) => {
        lib.print("Hello World :)");
        $("body").append($("<h1>Hello World :)</h1>"));
    });
}, 3000);


// Wystawianie (udostępnianie) biblioteki na zewnątrz, jako dziecko obiektu `window`:
const LIB_NAMEs = ["__shared"];
const LIB: any = {
    "Boo": Boo,
    "Foo": Foo
}

for (let i = 0; i < LIB_NAMEs.length; i++) {
    let name: string = LIB_NAMEs[i];

    if (typeof (<any>window)[name] !== "object") {
        (<any>window)[name] = LIB;
    }
}