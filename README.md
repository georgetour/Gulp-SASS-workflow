# Gulp-SASS-workflow
This is a project that uses NPM, Gulp and SASS so we can optimize our workflow. It will help new developers to learn to work with these tools.

##### Requirements : Very good level in HTML and CSS, basic understanding of javascript

Gulp is a tool that helps with workflow automation since it does a lot of tasks for us like minification, concatenation, browser refresh when we have changes and many more... The general idea is that gulp has tasks and each task does something for us automatically...

SASS is a preprocessor that makes CSS really powerful since you can have variables, mixin, partial, nesting, arguments, create grid responsive layouts and other cool stuff that will improve your CSS code amazingly.

<h6>In our project, gulpfile.js controls gulp tasks and package.json has all our dependencies</h6>

## Table of contents

- [Installation and starting](#installation-and-starting)
- [Our first task](#first-task-sass-compiler)
- [Browser-sync](#installing-browser-sync-and-Creating-Gulp-Task)
- [AutoPrefixer](#autoprefixer)
- [Copying and removing files](#copying-files)
- [Concatenating javascript](#concatenating-javascript-files-to-one-file)




## Installation and starting

First we install git so we can monitor our project's version :

 https://git-scm.com/download/win

 Then we install node.js :

https://nodejs.org/en/

We can check version of node by typing in command prompt :

<code>node -v</code>

Package manager version in command prompt

<code>npm -v</code>

Then to install gulp we type :

<code>npm install -g gulp</code>

We create a new repository to github.com with our account and then we clone.

Go to the directory you want to clone our repository with command prompt :

<code>git clone URL FROM OUR repository</code>

To create or reinitialize git :

<code>git init</code>

We need to create a package.json that will contain all our dependencies

<code>npm init</code>

We can easily install all packages we have in package.json with:

<code>npm install</code>

To start adding changes to your git (m stads for message) and add new files :

<code>git add .</code>

<code>git commit  -m "Add package.json"</code>

And we push the changes

<code>git push</code>

### Finally installing Gulp and SASS to our project

Install gulp and save dependencies to our project folder :

<code>npm install -save-dev gulp</code>

We can see in our package.json we have new dependanciesand a folder node-modules.

Install gulp-sass :

<code>npm install -save-dev gulp-sass</code>

By having package.json if we run npm install we will have all our packages again.

## First task SASS compiler

Create a js file that you will call the packages with require and control gulp tasks. For example in our project the file is called gulpfile.js. We must add our variable to our gulp file so we can use them where we want.

<pre><code>var gulp = require('gulp');
var sass = require('gulp-sass');
</code></pre>


We use task method and tell gulp where the source will be and the name of the task which is 'sass'. Gulp uses pipes which define what gulp will do. Explanation on pipes :

https://stackoverflow.com/questions/38404862/what-exactly-does-pipe-mean-in-gulp

The output style changes what css we will have. Expanded is normal,nested changes the curly brackets, compressed makes the css minified and compact puts each tag code in one line.
<pre>
<code>
gulp.task('sass', function(){
    return gulp.src('src/scss/app.scss')
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))
      .pipe(gulp.dest('app/css'));
});
</code>
</pre>

Finally at command prompt we say gulp and the name of the task :

<pre>
<code>gulp sass
</code></pre>

We can see scss is compiled at css.

<img src="images/gulp_in_action.jpg">

Later we can see we have a default task which simply runs with gulp command.

## Installing browser-sync and Creating Gulp Task

BrowserSync is a package that refreshes the page when it detects changes.

<pre><code>npm install --save-dev browser-sync
</code>
</pre>

BrowserSync also creates a server for us. Check gulpfile.js to see how it works.

We run gulp and we will see tasks running and server :
<img src="images/running_gulp.jpg">

 We can see any changes we save to files we specified with autorefresh thanks to BrowserSync.
<img src="images/browser_sync.jpg">

To make also css work we need to add a task and method watch. Again check gulpfile.js.

<pre><code>
gulp.task('watch', ['browserSync','sass'],function(){
    gulp.watch([SOURCE_PATHS.sassSource],['sass']);
  });
</code></pre>

We get now the changes made in css also.

## Autoprefixer

Autoprefixer is a package that automatically adds fixes fro browsers like -webkit, -moz etc.

<pre>
<code>npm install --save-dev gulp-autoprefixer
</code></pre>

Easily we add it to our sass task :

<pre><code>gulp.task('sass', function(){
    return gulp.src(SOURCE_PATHS.sassSource)//from
      .pipe(autoprefixer())
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))
      .pipe(gulp.dest(APP_PATH.css));//to
});
</code></pre>

Note : Since most modern browsers don't have issues and support everything maybe you should add

<pre><code>.pipe(autoprefixer('last 10 versions'))
</code></pre>


## Copying files

We can copy files from one place to another by having a task for this:
<pre><code>gulp.task('copy',function(){
    gulp.src(SOURCE_PATHS.htmlSource)
    .pipe(gulp.dest(APP_PATH.root))
});
</code></pre>

And then watch a file and if it has changes run the copy task as we see in gulpfile.js. The use for this is to have the original file and the minified one.

## Gulp clean

Gulp clean is a package that checks if we have removed a file from src and removes it from destination.

<pre><code>npm install --save-dev gulp-clean
</code></pre>



<pre><code>
gulp.task('clean-html',function(){
    gulp.src(APP_PATH.root + '* .html')
    .pipe(gulp.dest(APP_PATH.root))
});
</code></pre>

Also to have deleted without restarting gulp we must add the task to our copy task.

## Concatenating javascript files to one file

With this package we can have multiple js files concatenated to one.
First in our console :
<pre><code>npm install --save-dev gulp-concat
</code></pre>

Then we use it like this :

<pre><code>gulp.task('scripts',['clean-scripts'], function(){
  gulp.src(SOURCE_PATHS.jsSource)
      .pipe(concat('main.js'))
      .pipe(gulp.dest(APP_PATH.js))
});
</code></pre>
