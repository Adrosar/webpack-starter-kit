(function () {

    if (typeof window.__shared !== "object") {
        throw new Error();
    }

    var __ = window.__shared
    if (typeof __.Foo !== "function") {
        throw new Error();
    }

    var foo1 = new __.Foo();
    if (typeof foo1.getName !== "function") {
        throw new Error();
    }

    if (foo1.getName() !== null) {
        throw new Error();
    }

    var foo2 = new __.Foo("Foo 2");
    if (foo2.getName() !== "Foo 2") {
        throw new Error();
    }

})();