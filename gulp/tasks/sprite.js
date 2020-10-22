module.exports = function() {
    $.gulp.task("sprite", function() {
        return $.gulp.src("./src/images/icons/svg/*.svg")
            //.pipe($.replace("&gt;", ">"))
            .pipe($.svgSprite({
				preview: false,
                cssFile: "../../../src/css/partials/_sprite.scss",
				svg: {
					sprite: "../../../dest/images/sprites/sprite.svg"
				}
            }))
            .pipe($.gulp.dest("./dest/images/sprites/"))
            .pipe($.debug({"title": "sprite"}));
    });
};