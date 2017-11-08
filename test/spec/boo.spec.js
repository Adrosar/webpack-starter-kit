(function () {

    if (typeof window.__shared !== "object") {
        throw new Error();
    }

    var __ = window.__shared
    if (typeof __.Boo !== "function") {
        throw new Error();
    }

    var boo1 = new __.Boo();
    if (typeof boo1.getName !== "function") {
        throw new Error();
    }

    if (boo1.getName() !== null) {
        throw new Error();
    }

    var boo2 = new __.Boo("Boo 2");
    if (boo2.getName() !== "Boo 2") {
        throw new Error();
    }

})();