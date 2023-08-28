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

class Book {
  constructor(title, author, pages, read) {
    this.id = id++;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus(book, toggleStatusButton) {
    book.read = !book.read;

    const status = book.read ? 'Read' : 'Not read yet';

    toggleStatusButton.dataset.status = status;
    toggleStatusButton.textContent = status;
  }
}

function removeBook(id) {
  const book = myLibrary.find(book => book.id === id);

  myLibrary.splice(myLibrary.indexOf(book), 1);

  const bookCard = document.querySelector(`.book-card[data-id="${book.id}"]`);
  bookCard.remove();
}

function removeCardsFromDOM() {
  const bookCards = document.querySelectorAll('.book-card');
  bookCards.forEach(bookCard => bookCard.remove());
}

function addBookToLibrary(book) {
  removeCardsFromDOM();
  myLibrary.push(book);
}

function displayBooks(books) {
  books.forEach(({ id, title, author, pages, read }) => {
    const status = read ? 'Read' : 'Not read yet';
    library.insertAdjacentHTML(
      'beforeend',
      `<div class="book-card" data-id="${id}">
        <header class="book-card__header">
          <button class="button button--close" id="delete-button">
            <i class="ph-bold ph-x"></i>
          </button>
        </header>
        <div class="book-card__body">
          <span>${title}</span>
          <span>${author}</span>
          <span>${pages} pages</span>
        </div>
        <footer class="book-card__footer">
          <button class="button button--status" id="toggle-status-button" data-status="${status}">${status}</button>
        </footer>
      </div>`
    );
  });
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

  displayBooks(myLibrary);
  listenBookCardEvents();
});

function listenBookCardEvents() {
  const bookCards = document.querySelectorAll('.book-card');

  bookCards.forEach(bookCard => {
    const id = +bookCard.dataset.id;
    const deleteButton = bookCard.querySelector('#delete-button');
    const toggleStatusButton = bookCard.querySelector('#toggle-status-button');

    listenClickEvent(deleteButton, _ => removeBook(id));
    listenClickEvent(toggleStatusButton, _ => {
      const book = myLibrary[id];
      book.toggleReadStatus(book, toggleStatusButton);
    });
  });
}
