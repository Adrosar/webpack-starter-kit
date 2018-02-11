/**
 * Funkcja `nameResolve` generuje nazwę pliku w zależności od środowiska.
 * Gdy `ENVAR.ENV = "PROD"` nazwa ma postać "[name].min.[ext]"
 * w przeciwnym wypadku "[name].[ext]".
 * 
 * @param {string} name 
 * @param {string} ext 
 */
function nameResolve(name, ext, ENVAR) {

    var fullname;

    if (ENVAR.ENV === "PROD") {
        fullname = `${name}.min.${ext}`;
    } else {
        fullname = `${name}.${ext}`;
    }

    return fullname;
}

module.exports = nameResolve;