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
// Global variables
//-----------------------------------------------------

// JS
var inputJs = 'assets/scripts/src/**/*.js';
var outputJs = 'assets/scripts/';
// Sass
var inputSass = 'assets/styles/sass/**/*.scss';
var outputSass = 'assets/styles/css/';
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};


//-----------------------------------------------------
// Sass compiler task
//-----------------------------------------------------

gulp.task ('sass' , function() {
     return gulp
      .src(inputSass)
      .pipe(plumber())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest(outputSass))
      .pipe(cleanCSS())
      .pipe(rename('styles.min.css'))
      .pipe(gulp.dest(outputSass))
      .pipe(browserSync.stream());
});

//-----------------------------------------------------
// Scripts merge task
//-----------------------------------------------------

gulp.task ('minjs' , function() {
    return gulp
      .src (inputJs)
      .pipe(plumber())
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest(outputJs))
      .pipe(uglify())
      .pipe(rename('scripts.min.js'))
      .pipe(gulp.dest(outputJs))
      .pipe(browserSync.stream());
});



//-----------------------------------------------------
// Browser Sync task (static server)
//-----------------------------------------------------

// Watch main task

gulp.task('browser-sync' , function() {
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

//-----------------------------------------------------
// Watch tasks
//-----------------------------------------------------

gulp.task('watch', ['minjs', 'sass', 'browser-sync'] , function() {
      gulp.watch(inputJs, ['minjs']);
      gulp.watch(inputSass, ['sass']);
});
