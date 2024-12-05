document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#post_form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submitted');

        const formData = new FormData(form);

        const formDataObject = {
            title: formData.get('title'),
            featuring: formData.get('featuring'),
            length: formData.get('length'),
            authorID: '673ea25e1336b5bd2d014de2'
        }
        console.log(formDataObject);

        fetch('/posts', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })
});