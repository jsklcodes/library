const openModalButton = document.querySelector('#open-modal-button');
const closeModalButton = document.querySelector('#close-modal-button');
const modalOverlay = document.querySelector('#modal-overlay');

function toggleModalVisibility(action) {
  modalOverlay.classList[`${action}`]('overlay--active');
}

function listenClickEvent(element, event) {
  element.addEventListener('click', event);
}

listenClickEvent(openModalButton, () => toggleModalVisibility('add'));
listenClickEvent(closeModalButton, () => toggleModalVisibility('remove'));
