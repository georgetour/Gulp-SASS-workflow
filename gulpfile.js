var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload; //Comes with browserSync

//All files in our src
var SOURCE_PATHS ={
  sassSource : 'src/scss/*.scss'
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
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))
      .pipe(gulp.dest(APP_PATH.css));//to
});


//Browsersync creates a server for us and checks what files will
//be processed for refreshing
gulp.task('browserSync',['sass'],function(){ //run also sass task
    browserSync.init([APP_PATH.css + '/*.css', APP_PATH.root+'/*.html', APP_PATH.js +'/*.js'],//check for css,html,js files
    {
      server :{
        baseDir : APP_PATH.root //path for server base directory
      }

    })
});


//Run multiple tasks by calling only default task seperated with ,
gulp.task('default',['browserSync']);
