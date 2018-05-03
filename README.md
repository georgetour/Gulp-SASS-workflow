# Gulp-SASS-workflow
This is a project that uses NPM, Gulp and SASS so we can optimize our workflow. It will help new developers to learn to work with these tools.

#### Requirements : Very good level in HTML and CSS, basic understanding of javascript

Gulp is a tool that helps with workflow automation since it does a lot of tasks for us like minification, concatination, browser refresh when we have changes and many more...

SASS is a preprocessor that makes CSS really powerful since you can have variables, mixin, partial, nesting, arguments, create grid responsive layouts and other cool stuff that will improve your CSS code amazingly.

## Table of contents

- [Installation and starting](#installation-and-starting)
- [Our first task](#first-task-sass-compiler)




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

To start adding changes to your git (m stads for message) and add new files :

<code>git add .</code>

<code>git commit  -m "Add package.json"</code>

And we push the changes

<code>git push</code>

### Finally installing Gulp and SASS to our project

Install gulp and save dependancies

<code>npm install -save-dev gulp</code>

We can see in our package.json we have new dependanciesand a folder node-modules.

Install gulp-sass :

<code>npm install -save-dev gulp-sass</code>

By having package.json if we run npm install we will have all our packages again.

## First task SASS compiler

We must add our variable to our gulp file so we can use them where we want.

<pre>
<code>
var gulp = require('gulp');
var sass = require('gulp-sass');
</code>
</pre>

We use task method and tell gulp where the source will be and the name of the task which is 'sass'. Gulp uses pipes which define what gulp will do. Explanation on pipes :

https://stackoverflow.com/questions/38404862/what-exactly-does-pipe-mean-in-gulp
<pre>
<code>
gulp.task('sass', function(){
    return gulp.src('src/scss/app.scss')
      .pipe(sass({outputStyle : 'expanded'}).on('error',sass.logError))
      .pipe(gulp.dest('app/css'));
});
</code>
</pre>

Finally at command prompt we say gulp and the name of the task:

<pre>
<code>
gulp sass
</code>
</pre>
We can see scss is compiled at css.
<img src="images/gulp_in_action.jpg">
