//-----------------------------------------------------
// SWAN UI
// by Sebastian Serna
// 2016
//-----------------------------------------------------

'use strict';

var gulp = require( 'gulp' ),
    plumber = require( 'gulp-plumber'),
    sass = require( 'gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    uglify = require( 'gulp-uglify'),
    concat = require( 'gulp-concat'),
    browserSync = require('browser-sync').create();


//-----------------------------------------------------
// Sass transpiler variables
//-----------------------------------------------------

var input = 'assets/styles/sass/**/*.scss';
var output = 'assets/styles/css/';
var projectroot = './*.html';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

//-----------------------------------------------------
// Sass transpiler task
//-----------------------------------------------------

gulp.task ('sass' , function() {
     return gulp
      .src(input)
      .pipe(plumber())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(output))
      .pipe(cleanCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(output))
      .pipe(browserSync.stream());
});


//-----------------------------------------------------
// Browser Sync task (static server)
//-----------------------------------------------------

gulp.task ('browser-sync' , function() {
    browserSync.init([ output, projectroot ], {
        server: {
          baseDir: "./"
        }
    });
});


//-----------------------------------------------------
// Watch tasks
//-----------------------------------------------------

// Sass compiler

gulp.task('sass-up', function() {
    gulp.watch(input, ['sass']);
});

// Watch main task

gulp.task('watch', ['sass-up'], function() {
    browserSync.init({
        host: "localhost",
        port: 8888
    });
    gulp.watch([
      './layouts/*.htm',
      './layouts/**/*.htm',
      './partials/*.htm',
      './partials/**/*.htm',
      './pages/*.htm',
      './pages/**/*.htm',
      './assets/styles/css/*.css'
      ]).on("change", browserSync.reload);
});
