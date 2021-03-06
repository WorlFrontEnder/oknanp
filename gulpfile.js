"use strict";

var gulp             = require('gulp');                    
var autoprefixer     = require('gulp-autoprefixer');       
var changed          = require('gulp-changed');            
var concat           = require('gulp-concat');
var imagemin         = require('gulp-imagemin');
var notify           = require('gulp-notify');
var plumber          = require('gulp-plumber');
var pug              = require('gulp-pug');
var rename           = require('gulp-rename');
var scss             = require('gulp-sass');
var watch            = require('gulp-watch');
var browserSync      = require('browser-sync').create();
var htmlBeautify     = require('gulp-html-beautify');
var sourcemaps       = require('gulp-sourcemaps');



/*###########
START DEFAULT
#############*/
gulp.task('default', ['watch', 'server', 'pug', 'scss', 'imagemin', 'js']);


/*#########
START WATCH
###########*/
gulp.task('watch',  function(){
  gulp.watch('dist/scss/**/*.scss', ['scss']);
  gulp.watch('dist/pug/**/*.pug', ['pug']);
  gulp.watch('dist/js/**/*.js', ['js']);
  gulp.watch('dist/images/**/*.{png,jpg,gif,svg}', ['imagemin']);
});



/*###############
START BROWSERSYNC
#################*/
gulp.task('server', function() {
  browserSync.init({
      server: {
          baseDir: "./build"
      }
  });
  browserSync.watch('build', browserSync.reload)
});





/*#####################
 START SCSS COMPILATION
#######################*/
gulp.task('scss', function(){
  var baseSrc = 'dist/scss/*.scss';
  var baseUrl = 'build/css/';

  return gulp.src(baseSrc)
         .pipe(sourcemaps.init())
         .pipe(plumber({
            errorHandler: function(err) {
              notify.onError({
                title: 'SCSS compilation error',
                message: err.message
              })(err);
              this.emit('end');
            }
          }))
         .pipe(scss({outputStyle: 'compressed'}))
         .pipe(changed('dist/scss/**/*.scss'))
         .pipe(rename('style.min.css'))
         .pipe(concat('style.min.css'))
         .pipe(autoprefixer({
          browsers: ['last 1000 versions'],
          cascade: false
         }))
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(baseUrl))
});








/*####################
 START PUG COMPILATION
######################*/
gulp.task('pug', function(){
  var pugSrc = 'pug/**/*.pug';
  var buildHtml = 'build/';

          return gulp.src(pugSrc)
          .pipe(plumber({
            errorHandler: function(err) {
              notify.onError({
                title: 'PUG compilation error',
                message: err.message
              })(err);
              this.emit('end');
            }
          }))
         .pipe(pug({pretty: true}))
         .pipe(changed('pug/**/*.pug'))
         .pipe(htmlBeautify())
         .pipe(gulp.dest(buildHtml))
});




/*#####################
 START JAVASCROPT COMPY
#######################*/
gulp.task('js', function(){
  var jsSrc = 'dist/js/**/*.js';
  var jsDest = 'build/js/';

          return gulp.src(jsSrc)
          .pipe(plumber({
            errorHandler: function(err) {
              notify.onError({
                title: 'JAVASCRIPT compilation error',
                message: err.message
              })(err);
              this.emit('end');
            }
          }))
         
         .pipe(uglify())
         .pipe(changed('dist/js/**/*.js'))
         .pipe(gulp.dest(jsDest))
});



/*#############
START IMAGEMIN
###############*/
gulp.task('imagemin', function () {
  var imgSrc = 'dist/images/**/*.{png,jpg,gif,svg}';
  var imgDest = 'build/images/';
  return gulp.src(imgSrc)
      .pipe(plumber({                               
        errorHandler: function(err) {
          notify.onError({
            title: 'IMAGES compilation error',
            message: err.message
          })(err);
          this.emit('end');
        }
      }))
      .pipe(imagemin({
          progressive: true,
          optimizationLevel: 7
      }))
      
      .pipe(changed('dist/images/**/*.{png,jpg,gif,svg}'))
      .pipe(gulp.dest(imgDest));
});