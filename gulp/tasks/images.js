module.exports = function() {
    $.gulp.task("images", function() {
        return $.gulp.src(["./src/images/**/*.{jpg,jpeg,png,gif,svg}", "!./src/images/icons/svg/*", "!./src/images/favicons/*.{jpg,jpeg,png,gif}"])
            .pipe($.newer("./dest/images/"))
            .pipe($.imagemin([
                $.imagemin.gifsicle({interlaced: true}),
                $.imagemin.jpegtran({progressive: true}),
                $.imageminJpegRecompress({loops: 1, quality: "low"}),
                $.imagemin.svgo(),
                $.imagemin.optipng({optimizationLevel: 5}),
                $.pngquant({quality: "65-70", speed: 5})
            ]))
            .pipe($.gulp.dest("./dest/images/"))
            .pipe($.debug({"title": "images"}))
            .on("end", $.browsersync.reload);
    });
};