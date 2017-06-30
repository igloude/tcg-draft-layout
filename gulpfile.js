var gulp = require('gulp'),
    del = require('del'),
    sequence = require('run-sequence'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('styles', function() {
    return gulp.src('./src/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/'))
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(gulp.dest('./dist/'))
});

gulp.task('default', function(done) {
    sequence(
        'clean',
        ['styles', 'scripts'],
        done);
});

gulp.task('watch:styles', function () {
    gulp.watch(['./src/scss/**/*.scss'], ['styles'] );
});

gulp.task('watch:scripts', function () {
    gulp.watch(['./src/js/**/*.js'], ['scripts'] );
});

gulp.task('watch', function (done) {
    sequence(
        'watch:styles',
        'watch:scripts',
    done);
});
