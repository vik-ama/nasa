module.exports = function() {
    $.gulp.task("css", function() {
        return $.gulp.src(["./src/css/**/*.sass", "!./src/vendor/**/*.css"])
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
            .pipe($.sass())
            //.pipe($.uncss({
	        //    html: ['./src/views/**/*.html']
            //}))
            .pipe($.autoprefixer({browsers: ["last 12 versions", "> 1%", "ie 8", "ie 7"]}))
            .pipe($.mincss({compatibility: "ie8", level: {1: {specialComments: 0}}}))
            .pipe($.rename({suffix: ".min"}))
            .pipe($.replace("../../dest/", "../"))
            .pipe($.plumber.stop())
            .pipe($.sourcemaps.write("./maps/"))
            .pipe($.gulp.dest("./dest/css/"))
            .pipe($.debug({"title": "css"}))
            .on("end", $.browsersync.reload);
    });
};
