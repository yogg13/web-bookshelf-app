let books = [];
const STORAGE_KEY = "BOOKSHELF_APPS";
const form = document.querySelector("#inputBook");

function addBook() {
    const inputBookTitle = document.querySelector("#inputBookTitle").value;
    const inputBookAuthor = document.querySelector("#inputBookAuthor").value;
    const inputBookYear = document.querySelector("#inputBookYear").value;

    const newBook = {
        id: +new Date(),
        title: inputBookTitle,
        author: inputBookAuthor,
        year: inputBookYear,
        isCompleted: false
    };

    books.push(newBook);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));

    document.querySelector("#inputBookTitle").value = "";
    document.querySelector("#inputBookAuthor").value = "";
    document.querySelector("#inputBookYear").value = "";

    displayBook();

}

function checkBook(paramIndex) {
    const bookParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    bookParsed[paramIndex].isCompleted = true;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookParsed));

    displayBook();
    // return true;
}

function unCheckBook(paramIndex) {
    const bookParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    bookParsed[paramIndex].isCompleted = false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookParsed));

    displayBook();

    // return true;
}

function editBook(paramIndex) {

    const bookParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    document.querySelector("#inputBookTitle").value = bookParsed[paramIndex].title;
    document.querySelector("#inputBookAuthor").value = bookParsed[paramIndex].author;
    document.querySelector("#inputBookYear").value = bookParsed[paramIndex].year;

    document.querySelector("#bookSubmit").addEventListener("click", function (event) {
        event.preventDefault();

        bookParsed[paramIndex].title = document.querySelector("#inputBookTitle").value;
        bookParsed[paramIndex].author = document.querySelector("#inputBookAuthor").value;
        bookParsed[paramIndex].year = document.querySelector("#inputBookYear").value;

        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookParsed));

        document.querySelector("#inputBookTitle").value = "";
        document.querySelector("#inputBookAuthor").value = "";
        document.querySelector("#inputBookYear").value = "";

        document.querySelector("#bookSubmit").removeEventListener("submit", addBook);

        displayBook();

    });
}

function deleteBook(paramIndex) {
    const bookParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    const confirmValidate = window.confirm("Apakah Anda yakin ingin menghapus buku ini?");
    if (confirmValidate === false) {
        return false;
    }

    bookParsed.splice(paramIndex, 1);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookParsed));

    displayBook();
}

function displayBook() {
    const inCompleteBook = document.querySelector("#incompleteBookshelfList");
    const completeBook = document.querySelector("#completeBookshelfList");
    const bookParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    inCompleteBook.innerHTML = "";
    completeBook.innerHTML = "";


    bookParsed.forEach((book, index) => {
        if (book.isCompleted === false) {
            inCompleteBook.innerHTML += `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.year}</p>
                <div class="action">
                    <button class="green" id="green" onclick="checkBook(${index})">Selesai dibaca</button>
                    <button class="red" id="red" onclick="deleteBook(${index})">Hapus buku</button>
                    <button class="yellow" id="yellow" onclick="editBook(${index})">Edit buku</button>
                </div>
            </article>
            `
        } else {
            completeBook.innerHTML += `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.year}</p>
                <div class="action">
                    <button class="green" id="green" onclick="unCheckBook(${index})">Belum selesai dibaca</button>
                    <button class="red" id="red" onclick="deleteBook(${index})">Hapus buku</button>
                </div>
            </article>
            `
        }
    });

}

function filterBook() {
    const bookParsed = JSON.parse(localStorage.getItem(STORAGE_KEY));

    const inCompleteBook = document.querySelector("#incompleteBookshelfList");
    const completeBook = document.querySelector("#completeBookshelfList");
    const inputFilter = document.querySelector("#searchBookTitle").value;

    if (inputFilter === "") {
        return displayBook();
    }

    inCompleteBook.innerHTML = "";
    completeBook.innerHTML = "";

    const filterBook = bookParsed.filter((book) => {
        return book.title.toLowerCase().includes(inputFilter.toLowerCase());
    });

    filterBook.forEach((book, index) => {
        if (book.isCompleted === false) {
            inCompleteBook.innerHTML += `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.year}</p>
                <div class="action">
                    <button class="green" id="green" onclick="checkBook(${index})">Selesai dibaca</button>
                    <button class="red" id="red" onclick="deleteBook(${index})">Hapus buku</button>
                    <button class="yellow" id="yellow" onclick="editBook(${index})">Edit buku</button>
                </div>
            </article>
            `;
        } else {
            completeBook.innerHTML += `
            <article class="book_item">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.year}</p>
                <div class="action">
                    <button class="green" id="green" onclick="unCheckBook(${index})">Belum selesai dibaca</button>
                    <button class="red" id="red" onclick="deleteBook(${index})">Hapus buku</button>
                </div>
            `;
        }
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
})

document.querySelector("#searchBook").addEventListener("submit", function (event) {
    event.preventDefault();
    filterBook();
})

window.addEventListener("load", function (event) {
    event.preventDefault();
    displayBook();
})
