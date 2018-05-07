//Browserify syntax
global.jQuery = require('jquery'); //global function makes it top-level scope object (window)
bootstrap = require('bootstrap');
mustache = require('mustache');


jQuery(document).ready(function(){
  console.log("hello");
});
