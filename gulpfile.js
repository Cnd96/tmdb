const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concatCss = require('gulp-concat-css');
const concat =require('gulp-concat');
const uglify = require('gulp-uglify');
 
gulp.task('minify-css', () => {
  return gulp.src('./css/*.css')
    .pipe(concatCss("main.css"))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
});

 
gulp.task('scripts', function() {
  return gulp.src(['./idb.js','./lib/jquery.min.js','./lib/popper.min.js','./lib/boostrap.min.js',
  './lib/angular.min.js','./lib/angular.routes.min.js',
  './app.module.js', './app.routes.js', 
  './app.controller.js','./services/*.js','./pages/**/*.js',
  './components/**/*.js','./directives/js/*.js'])
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});