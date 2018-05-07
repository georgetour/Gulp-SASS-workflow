//Browserify syntax
global.jQuery = require('jquery'); //global function makes it top-level scope object (window)
bootstrap = require('bootstrap');
mustache = require('mustache');


//Get data from json and show them to template with mustache
jQuery(document).ready(function($){
  var jsonData =  $.getJSON('data.json',function(){

  }).done(function(data){
    var template = $('#template').html();
    var showTemplate = mustache.render(template,data)//where the template will be created, what data
    $('#gallery').html(showTemplate);//where to show the template we created
  });
});
