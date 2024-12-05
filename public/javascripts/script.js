document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById("signupForm")
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const formDataObject = {
            name: formData.get('name'),
            memberSince: "2024",
            borrowedBooks: ""
        };
        console.log(formDataObject)

        fetch('/members', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })

    const books = document.querySelectorAll('.book')
    books.forEach(book => {
        const return_button = book.querySelector(".edit-button");
        return_button.addEventListener("click", () => {
            const bookId = return_button.getAttribute('data-book-id');
            fetch(`/books/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then()
        })

        const ban_button = book.querySelector(".ban-button")
        ban_button.addEventListener("click", () => {
            const bookId = return_button.getAttribute('data-book-id');
            fetch(`/books/${bookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then()
        })
    })


})