var gulp = require("gulp");
var less = require("gulp-less");

function styles() {
    return gulp.src('less/style.less')
        .pipe(less())
        .pipe(gulp.dest('./css/'))
};

gulp.task('default', function() {
    gulp.watch('less/style.less', styles);
});