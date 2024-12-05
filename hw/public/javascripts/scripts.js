document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#post_form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submitted');

        const formData = new FormData(form);

        const formDataObject = {
            title: formData.get('title'),
            release_date: formData.get('release_date'), 
            tracks: formData.get('tracks'),
            color: formData.get('color'),
        }
        console.log(formDataObject);

        fetch('/albums', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        })
    })

    const albums = document.querySelectorAll('.album');
    albums.forEach(album => {
        const editButton = album.querySelector('.edit_button');
        editButton.addEventListener('click', () => {

            //title input field
            const title = album.querySelector('.title');
            const titleInput = document.createElement('input');
            titleInput.value = title.innerText;
            titleInput.name = 'title';
            titleInput.classList.add('title_input');
            title.innerHTML ='';
            title.appendChild(titleInput);

            //release date input field
            const date = album.querySelector('.release_date');
            const dateInput = document.createElement('input');
            dateInput.value = date.innerText;
            dateInput.name = 'date';
            dateInput.classList.add('date_input');
            date.innerHTML ='';
            date.appendChild(dateInput);

            //tracks input field
            const tracks = album.querySelector('.tracks');
            const tracksInput = document.createElement('input');
            tracksInput.value = tracks.innerText;
            tracksInput.name = 'tracks';
            tracksInput.classList.add('tracks_input');
            tracks.innerHTML ='';
            tracks.appendChild(tracksInput);

            //save button
            const saveButton = document.createElement('button');
            saveButton.classList.add('save_button');
            saveButton.innerText = 'Save';

            saveButton.addEventListener('click', () => {
                const updatedAlbum = {
                    title: titleInput.value,
                    release_date: dateInput.value,
                    tracks: tracksInput.value
                }
                console.log(updatedAlbum);
            })
            album.appendChild(saveButton);


        })
    })
});

async function updateAlbum(updatedAlbum){
    fetch('/albums', {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAlbum)
    })
}