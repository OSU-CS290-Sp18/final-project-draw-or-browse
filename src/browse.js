/*  Filename:    Browse.js
    Description: This is the js file related to browsing the twit previously saved by the user.
    */


var allTwits = [];

function showCreateTwitModal() {

   var modalBackdrop = document.getElementById('modal-backdrop');
   var createTwitModal = document.getElementById('create-twit-modal');

   // Show the modal and its backdrop.
   modalBackdrop.classList.remove('hidden');
   createTwitModal.classList.remove('hidden');
}

function hideCreateTwitModal() {

   var modalBackdrop = document.getElementById('modal-backdrop');
   var createTwitModal = document.getElementById('create-twit-modal');

   // Hide the modal and its backdrop.
   modalBackdrop.classList.add('hidden');
   createTwitModal.classList.add('hidden');
}

/*
 *  Password modal stuff
 */

function showPasswordModal() {
   var passwordModal = document.getElementById('password-modal');

   //show password modal
   passwordModal.classList.remove('hidden');
}

function hidePasswordModal() {
   var passwordModal = document.getElementById('password-modal');

   document.getElementById('password-input').value = "";
   passwordModal.classList.add('hidden');
}

function handlePasswordSubmit() {
   var passwordEntry = document.getElementById('password-input').value;
   if(passwordEntry) {
      allTwits.push({
	 password: passwordEntry
      });
      document.getElementById('password-input').value = "";
      hidePasswordModal();
      hideCreateTwitModal();
   }
   else {
      alert('You need to enter a password!');
   }
}

function parseTwitElem(twitElem) {

   var twit = {};

   var twitTextElem = twitElem.querySelector('.drawing-text');
   twit.text = twitTextElem.textContent.trim();

   return twit;
}




var twitElemsCollection = document.getElementsByClassName('drawing');
for (var i = 0; i < twitElemsCollection.length; i++) {
   allTwits.push(parseTwitElem(twitElemsCollection[i]));
}




var createTwitButton = document.getElementsByClassName("drawing");
if (createTwitButton) {
   for(var i=0; i < allTwits.length; i++) {
      createTwitButton[i].addEventListener('click', showCreateTwitModal);
   }
}

var modalCloseButton = document.querySelector('#create-twit-modal .modal-close-button');
if (modalCloseButton) {
   modalCloseButton.addEventListener('click', hideCreateTwitModal);
}

var modalCancalButton = document.querySelector('#create-twit-modal .modal-cancel-button');
if (modalCancalButton) {
   modalCancalButton.addEventListener('click', hideCreateTwitModal);
}

//opens the password modal if the user clicks the edit button
var openPasswordModal = document.querySelector('#create-twit-modal .modal-edit-button'); 
if(openPasswordModal) {
   openPasswordModal.addEventListener('click', showPasswordModal);
}

//opens password modal if user clicks the delete button
var openPasswordModal = document.querySelector('#create-twit-modal .modal-delete-button'); 
if(openPasswordModal) {
   openPasswordModal.addEventListener('click', showPasswordModal);
}

var closePasswordModal = document.querySelector('#password-modal .modal-close-button');
if (closePasswordModal) {
   closePasswordModal.addEventListener('click', hidePasswordModal);
}

var submitPasswordModal = document.querySelector('#password-modal .modal-submit-button');
if (submitPasswordModal) {
   submitPasswordModal.addEventListener('click', handlePasswordSubmit);
   // submitPasswordModal.addEventListener('click', hidePasswordModal);
}
