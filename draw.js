/*  Filename:    Draw.js
    Description: This is the js file related to users drawing on a clean template. This file will also contain the canvas for users to draw on.
*/

var sketchpad = new Sketchpad({
  element: '#sketchpad',
  width: 600,
  height: 600
});

var undoButton = document.getElementById('undo-button');

undoButton.addEventListener('click', function(event){
  sketchpad.undo();
});

var redoButton = document.getElementById('redo-button');

redoButton.addEventListener('click', function (event){
  sketchpad.redo();
});

var colorButton = document.getElementById('color-button');

colorButton.addEventListener('change', function (event){
  sketchpad.color = colorButton.value;
});

var strokeSize = document.getElementById('myRange');

strokeSize.addEventListener('change', function (event){
  sketchpad.penSize = strokeSize.value;
});

var animateButton = document.getElementById('animate-button');

animateButton.addEventListener('click', function(event){
  sketchpad.animate(10);
});