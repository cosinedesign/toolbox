var gulp = require('gulp'),
    concat = require('gulp-concat'),
    karma = require('karma').Server,
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower');

function getSrc() {
    return gulp
        .src([
            'package/toolbox.head.js',
            'src/tools/multicast.js',
            'package/exports.js',
            'package/toolbox.foot.js'
        ]);
}

gulp.task('build-dev', function () {
    return getSrc()
        .pipe(concat('toolbox.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('build-dev-test', ['build-dev'], function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('minify-js', function () {
    return getSrc()
        .pipe(concat('toolbox.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});

gulp.task('build-test', ['minify-js'], function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('generate-node-module', function () {
    return gulp
        .src([
            'src/tools/multicast.js',
            'src/tools/tools.exports.js',
            'src/cosinedesign.toolbox.js',
            'src/cosinedesign.mixins.*.js'
        ])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});

gulp.task('register-bower', function() {
    return bower({ cmd: 'register'});
});