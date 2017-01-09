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

// JavaScript files
var outputJs = 'assets/scripts/',
    inputJs = [
      // Native and adapted
      'assets/scripts/src/components/core.js',
      'assets/scripts/src/components/menu.js',
      'assets/scripts/src/components/switch-theme.js',
      'assets/scripts/src/components/toggle.js',
      'assets/scripts/src/components/mapview.js',
      'assets/scripts/src/components/dialog.js',
      'assets/scripts/src/components/scroll-anchor.js',
      'assets/scripts/src/components/slideshow.js',
      // Vendors
      'assets/scripts/src/vendors/svg4everybody.js',
      'assets/scripts/src/vendors/syntax-xml.js'
    ];

// Sass files
var outputSass = 'assets/styles/css/',
    inputSass = 'assets/styles/sass/**/*.scss',
    sassOptions = {
      errLogToConsole: true,
      outputStyle: 'expanded'
    };

// BrowserSync server files
var inputBrowserFiles = [
      './layouts/*.htm',
      './layouts/**/*.htm',
      './partials/*.htm',
      './partials/**/*.htm',
      './pages/*.htm',
      './pages/**/*.htm',
      './assets/styles/css/*.css'
    ];


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
// Scripts minification and concat task
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
// BrowserSync task (server)
//-----------------------------------------------------

gulp.task('browser-sync' , function() {
    browserSync.init({
        proxy: "localhost:8888"
    });

});

//-----------------------------------------------------
// Watch main task
//-----------------------------------------------------

gulp.task('watch', ['minjs', 'sass', 'browser-sync'] , function() {
      gulp.watch(inputJs, ['minjs']);
      gulp.watch(inputSass, ['sass']);
      gulp.watch(inputBrowserFiles).on("change", browserSync.reload);
});
