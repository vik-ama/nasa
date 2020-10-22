module.exports = function() {
    $.gulp.task("fonts", function() {
        return $.gulp.src(["./src/fonts/**"])
            .pipe($.gulp.dest("./dest/fonts/"))
            .pipe($.debug({"title": "fonts"}))
    });
};