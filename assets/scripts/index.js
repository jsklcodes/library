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

const addBookForm = document.querySelector('#add-book-form');
const library = document.querySelector('#library');

let myLibrary = [];

let id = myLibrary.length;

function Book(title, author, pages, read) {
  this.id = id++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function removeLibraryChildrenExceptFirst() {
  const children = library.children;

  for (let i = 1; i < children.length; i++) {
    children[i].remove();
  }
}

function addBookToLibrary(book) {
  removeLibraryChildrenExceptFirst();
  myLibrary.push(book);
  console.log(myLibrary);
}

addBookForm.addEventListener('submit', event => {
  event.preventDefault();

  const [_, titleInput, authorInput, pagesInput, statusInput] =
    event.target.elements;

  const book = new Book(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    statusInput.checked
  );

  addBookToLibrary(book);
  toggleModalVisibility('remove');

  titleInput.value = '';
  authorInput.value = '';
  pagesInput.value = '';
  statusInput.checked = true;
});
