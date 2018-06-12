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

var modalButton = document.getElementById('modal-button');

modalButton.addEventListener('click', function(event){
  var backdrop = document.getElementById('modal-backdrop');
  var modal = document.getElementById('save-sketch-modal');
  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');
  var preview = convertCanvasToImage(sketchpad);
});

var modalCancelButton = document.getElementById('modal-cancel-button');

modalCancelButton.addEventListener('click', function(event){
  var backdrop = document.getElementById('modal-backdrop');
  var modal = document.getElementById('save-sketch-modal');
  backdrop.classList.add('hidden');
  modal.classList.add('hidden');
});

// Converts canvas to an image
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL();
	return image;
}
