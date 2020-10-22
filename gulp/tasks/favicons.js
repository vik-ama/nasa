module.exports = function() {
    $.gulp.task("favicons", function() {
        return $.gulp.src("./src/images/favicons/*.{jpg,jpeg,png,gif}")
            .pipe($.favicons({
                icons: {
                    appleIcon: true,
                    favicons: true,
                    online: false,
                    appleStartup: false,
                    android: false,
                    firefox: false,
                    yandex: false,
                    windows: false,
                    coast: false
                }
            }))
            .pipe($.gulp.dest("./dest/images/favicons/"))
            .pipe($.debug({"title": "favicons"}));
    });
};