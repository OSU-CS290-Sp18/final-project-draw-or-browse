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
var backdrop = document.getElementById('modal-backdrop');
var modal = document.getElementById('save-sketch-modal');

modalButton.addEventListener('click', function(event){
  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');
  imagePreview();
});

var modalCancelButton = document.getElementById('modal-cancel-button');
var modalTitleText = document.getElementById('title-input');
var modalAuthorText = document.getElementById('author-input');
var modalPasswordText = document.getElementById('password-input');
var modalCloseButton = document.getElementById('modal-close-button');
var modalPreview = document.getElementById('modal-preview');

modalCancelButton.addEventListener('click', handleModalClose);
modalCloseButton.addEventListener('click', handleModalClose);

function handleModalClose (event){
  console.log("== Modal X Clicked");
  backdrop.classList.add('hidden');
  modal.classList.add('hidden');
  modalTitleText.value = "";
  modalAuthorText.value = "";
  modalPasswordText.value = "";
};

var canvas = document.getElementById('sketchpad');

function imagePreview (event){
  var dataURL = canvas.toDataURL();
  modalPreview.src = dataURL;
};

var modalAcceptButton = document.getElementById('modal-accept-button');
modalAcceptButton.addEventListener('click', handleModalAccept);

function handleModalAccept(event){
  if(modalAuthorText.value === "" || modalTitleText.value === "" || modalPasswordText.value === ""){
    alert("Oops! Looks like you haven't filled out all the fields!");
  }
  else{
    //save image, title, author, and password to the database
    var dataURL = canvas.toDataURL();
  }
};
