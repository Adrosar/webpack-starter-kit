module.exports = {
    concat: {
        rules: [{
            output: "dist/app/commons.js",
            files: [
                "assets/jquery/jquery-2.2.4.min.js",
                "assets/bootstrap/4.0.0/js/bootstrap.bundle.min.js",
                "assets/holder/2.9.0/holder.min.js"
            ],
            mode: 'before' // merge|before|after
        }, {
            output: "dist/app/commons.css",
            files: [
                "assets/bootstrap/4.0.0/css/bootstrap.min.css"
            ],
            mode: 'before' // merge|before|after
        }]
    },
    copy: {
        rules: [{
            source: "assets",
            destiny: "dist",
        }]
    }
}