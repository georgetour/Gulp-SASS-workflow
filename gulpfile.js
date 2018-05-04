var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload; //Comes with browserSync
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');

//All files in our src
var SOURCE_PATHS ={
  sassSource : 'src/scss/*.scss',
  htmlSource :'src/*.html',
  jsSource : 'src/js/**' // if you don't have it with ** concat won't work
}


//All files in our app
var APP_PATH = {
  root:'app/',
  css : 'app/css',
  js : 'app/js'
}

//SASS to css
gulp.task('sass', function(){
    return gulp.src(SOURCE_PATHS.sassSource)//from
      .pipe(autoprefixer('last 10 versions'))
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))
      .pipe(gulp.dest(APP_PATH.css));//to
});


//Copy javascripts file from src to app
gulp.task('scripts',['clean-scripts'], function(){
  gulp.src(SOURCE_PATHS.jsSource)
      .pipe(concat('main.js'))
      .pipe(gulp.dest(APP_PATH.js))
});



//clean scripts if not exist in src
gulp.task('clean-scripts',function(){
  return gulp.src(APP_PATH.js +'/*.js', {read:false})
  .pipe(clean());
});


//copy files from source to app
gulp.task('copy',['clean-html'],function(){
    gulp.src(SOURCE_PATHS.htmlSource)
    .pipe(gulp.dest(APP_PATH.root))
});



//clean html files that are deleted
gulp.task('clean-html',function(){
  return gulp.src(APP_PATH.root +'*.html', {read:false})
  .pipe(clean());
});


//Browsersync creates a server for us and checks what files will
//be processed for refreshing
gulp.task('browserSync',function(){ //run also sass task
    browserSync.init([APP_PATH.css + '/*.css', APP_PATH.root+'/*.html', APP_PATH.js +'/*.js'],//check for css,html,js files
    {
      server :{
        baseDir : APP_PATH.root //path for server base directory
      }
    })
});


//Watch for changes in browserSync, sass, html, js
gulp.task('watch', ['browserSync','sass','copy','clean-html','clean-scripts','scripts'], function(){
    gulp.watch([SOURCE_PATHS.sassSource],['sass']);
    gulp.watch([SOURCE_PATHS.htmlSource],['copy']);//if we have changes to html folder copy it to app
    gulp.watch([SOURCE_PATHS.jsSource],['scripts']);
  });


//Run multiple tasks by calling only default task seperated with ,
gulp.task('default',['watch']);
