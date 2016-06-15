var gulp = require('gulp'),
    concat = require('gulp-concat'),
    karma = require('karma').Server,
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower');

function getSrcArray () {
    return [
        'package/toolbox.head.js',
        'src/tools/delimit.js',
        'src/tools/multicast.js',
        'src/tools/lifecycle.js',
        'src/tools/property.js',
        // 'src/tools/observe.js',
        'src/data/throttle.js',
        'src/data/pipe.js',
        'src/mixins/events.js',
        'src/management/logging.js',
        'package/exports.js',
        'package/toolbox.foot.js'
    ];
}
function getSrc() {
    return gulp
        .src(getSrcArray());
}

gulp.task('build-dev', function () {
    return getSrc()
        .pipe(concat('toolbox.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('build-node', function () {
    var src = getSrcArray();
    src.push('package/toolbox.node.js');
    return gulp
        .src(src)
        .pipe(concat('toolbox.node.js'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('build-dev-test', ['build-dev'], function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true

    }, function () { done(); }).start(); // STUPID fix for karma not calling done()
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
    }, function () { done(); }).start();
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