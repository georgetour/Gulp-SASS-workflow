var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload; //Comes with browserSync
var autoprefixer = require('gulp-autoprefixer');

//All files in our src
var SOURCE_PATHS ={
  sassSource : 'src/scss/*.scss',
  htmlSource :'src/*.html'
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


//copy files from source to app
gulp.task('copy',function(){
    gulp.src(SOURCE_PATHS.htmlSource)
    .pipe(gulp.dest(APP_PATH.root))
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


//Watch for changes in browserSync, sass and html
gulp.task('watch', ['browserSync','sass','copy'],function(){
    gulp.watch([SOURCE_PATHS.sassSource],['sass']);
    gulp.watch([SOURCE_PATHS.htmlSource],['copy'])//if we have changes to html folder copy it to app 
  });


//Run multiple tasks by calling only default task seperated with ,
gulp.task('default',['watch']);
