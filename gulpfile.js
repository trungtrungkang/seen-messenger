"use strict";

var gulp = require("gulp");
var run = require('gulp-run');

gulp.task('bundle-js', function () {
    var cmd = new run.Command('jspm build src/main.js public/assets/js/build.js --minify --skip-source-maps');
    cmd.exec();
});

gulp.task('build-debug-js', function () {
    var cmd = new run.Command('jspm build src/main.js public/assets/js/build.js --skip-source-maps');
    cmd.exec();
});

gulp.task('seen-deploy', function () {
    return gulp.src('public/assets/**/*')
        .pipe(gulp.dest('../seen/assets/'));
});

gulp.task('copy-css', function () {
    return gulp.src('assets/css/**/*')
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('copy-images', function () {
    return gulp.src('assets/images/**/*')
        .pipe(gulp.dest('public/assets/images'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('assets/lib/uikit/fonts/**/*')
        .pipe(gulp.dest('public/assets/lib/uikit/fonts'));
});

gulp.task('copy-lib', function(){
    return gulp.src('assets/lib/quill/**/*')
        .pipe(gulp.dest('public/assets/lib/quill/'));
});

gulp.task('copy-rs', ['copy-lib','copy-css', 'copy-images', 'copy-fonts']);

gulp.task('build-debug', ['copy-rs', 'build-debug-js']);
gulp.task('default', ['copy-rs', 'bundle-js']);