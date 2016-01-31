var gulp = require('gulp');

var concat = require('gulp-concat');
var karma = require('karma').Server;
var uglify = require('gulp-uglify');

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

gulp.task('default', ['minify-js'], function (done) {
    new karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});