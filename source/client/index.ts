// App:
import initPublicPath from "../lib/initPublicPath";
initPublicPath("App");
console.log("Hello World!");

setTimeout(() => {
    import(/* webpackChunkName: "boo" */'./boo').then((module) => {
        console.log(module.name);
    });
}, 500);

setTimeout(() => {
    import(/* webpackChunkName: "foo" */'./foo').then((module) => {
        console.log(module.getName());
    });
}, 1000);