var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload; //Comes with browserSync
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var injectPartials = require('gulp-inject-partials');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');


//All files in our src
var SOURCE_PATHS ={
  sassSource : 'src/scss/*.scss',
  sassApp : 'src/scss/app.scss',
  htmlSource :'src/*.html',
  htmlPartialSource : 'src/partial/*.html', //partial for repeating content
  jsSource : 'src/js/**', // if you don't have it with ** concat won't work
  fontSource:'src/scss/fonts/**',
  imgSource : 'src/img/**'
}


//All files in our app
var APP_PATH = {
  root:'app/',
  css : 'app/css',
  js : 'app/js',
  fonts : 'app/fonts',
  img : 'app/img'
}

//SASS to css
gulp.task('sass', function(){

  //Import bootstrap from modules
   var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
   var sassFiles;

    sassFiles =  gulp.src(SOURCE_PATHS.sassApp)//from
      .pipe(autoprefixer('last 10 versions'))
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))

      //Make bootstrap files and sass files into one and output them in app.css
      return merge(bootstrapCSS,sassFiles)
          .pipe(concat('app.css'))
          .pipe(gulp.dest(APP_PATH.css));//to
});






//Check newer Images transfer them from src to app and minify them
gulp.task('images',function(){
    return gulp.src(SOURCE_PATHS.imgSource)
    .pipe(newer(APP_PATH.img))
    .pipe(imagemin())
    .pipe(gulp.dest(APP_PATH.img));
});


//Have bootstrap fonts and custom fonts
gulp.task('fonts',function(){
  gulp.src('./node_modules/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
      .pipe(gulp.dest(APP_PATH.fonts));
  gulp.src(SOURCE_PATHS.fontSource)
          .pipe(gulp.dest(APP_PATH.fonts));
});


//Copy javascripts file from src to app
gulp.task('scripts', function(){
  gulp.src(SOURCE_PATHS.jsSource)
      .pipe(concat('main.js'))
      .pipe(browserify())
      .pipe(gulp.dest(APP_PATH.js))
});


/*** Production Tasks ***/

//Minify javascript
gulp.task('compress', function(){
  gulp.src(SOURCE_PATHS.jsSource)
      .pipe(concat('main.js'))
      .pipe(browserify())
      .pipe(minify())
      .pipe(gulp.dest(APP_PATH.js))
});

//Minify css
gulp.task('compress-css', function(){

  //Import bootstrap from modules
   var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css')
   var sassFiles;

    sassFiles =  gulp.src(SOURCE_PATHS.sassSource)//from
      .pipe(autoprefixer('last 10 versions'))
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))
      return merge(bootstrapCSS,sassFiles)
          .pipe(concat('app.css'))
          .pipe(cssmin())
          .pipe(rename({suffix: '.min'}))// Prefix name for our min file
          .pipe(gulp.dest(APP_PATH.css));//to
});

/*** End Production Tasks ***/

//clean scripts if not exist in src
// gulp.task('clean-scripts',function(){
//   return gulp.src(APP_PATH.js +'/*.js', {read:false})
//   .pipe(clean());
// });


//html partial for menu and repeating content
gulp.task('html',function(){
  return gulp.src(SOURCE_PATHS.htmlSource)
  .pipe(injectPartials())
  .pipe(gulp.dest(APP_PATH.root));
});


/*//copy files from source to app
gulp.task('copy',['clean-html'],function(){
    gulp.src(SOURCE_PATHS.htmlSource)
    .pipe(gulp.dest(APP_PATH.root))
});
*/


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


//Watch for changes in browserSync, sass, html, js and run all tasks inside watch task
gulp.task('watch', ['browserSync','sass','clean-html','scripts','fonts','images','html'], function(){
    gulp.watch([SOURCE_PATHS.sassSource],['sass']);
    //gulp.watch([SOURCE_PATHS.htmlSource],['copy']);//if we have changes to html folder copy it to app
    gulp.watch([SOURCE_PATHS.jsSource],['scripts']);
    gulp.watch([SOURCE_PATHS.imgSource],['images']);
    gulp.watch([SOURCE_PATHS.htmlSource,SOURCE_PATHS.htmlPartialSource],['html']);//Check html for changes
  });


//Run multiple tasks by calling only default task seperated with ,
gulp.task('default',['watch']);

gulp.task('production',['compress','compress-css']);
