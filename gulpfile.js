var gulp = require('gulp'),
    concat = require('gulp-concat'),
    karma = require('karma').Server,
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower');


gulp.task('minify-js', function () {
    return gulp
        .src([
            'src/cosinedesign.toolbox.js',
            'src/cosinedesign.mixins.*.js'
        ])
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