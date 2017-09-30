
require("./index.html");
require("./style.css");

import { Foo } from "./foo";
import { Boo } from "./boo";

import { Lib } from "./lib.d";
const loadLib: BundleLoaderFunction = require("bundle-loader?lazy&name=lib!./lib.ts");

let foo: Foo = new Foo();
let boo: Boo = new Boo("Boo");

console.log("> Foo:", foo.getName());
console.log("> Boo:", boo.getName());

loadLib((lib: Lib) => {
    lib.print("Hello World :)");
    $("body").append($("<h1>Hello World :)</h1>"));
});
