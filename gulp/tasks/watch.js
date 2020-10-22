module.exports = function() {
    $.gulp.task("watch", function() {
        return new Promise((res, rej) => {
            $.watch(["./src/views/**/*.html", "!./src/views/blocks/*.html"], $.gulp.series("html"));
            $.watch("./src/css/**/*.sass", $.gulp.series("css"));
            $.watch(["./src/images/**/*.{jpg,jpeg,png,gif}", "!./src/images/icons/svg/*.svg", "!./src/images/favicons/*.{jpg,jpeg,png,gif}"], $.gulp.series("images"));
            $.watch("./src/js/**/*.js", $.gulp.series("scripts"));
            res();
        });
    });
};