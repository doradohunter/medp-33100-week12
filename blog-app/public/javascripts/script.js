document.addEventListener('DOMContentLoaded', () => {


    const searchForm = document.querySelector('#search_form');
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(searchForm);
        const search = formData.get('search');
        const newPosts = await getPosts(search);
        refreshPosts(newPosts);
    });

    const form = document.querySelector('#post_form');
    form.addEventListener('submit', async (e) => {
        console.log('submitted');
        e.preventDefault();

        const submitButton = form.querySelector('#submit_button');
        submitButton.disabled = true;
        submitButton.innerHTML = 'Uploading...';

        const formData = new FormData(form);

        await fetch('/posts', {
            method: 'POST',
            body: formData
        });
        submitButton.disabled = false;
        submitButton.innerHTML = 'Submit';
    })

    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const postID = post.id;
        const commentForm = post.querySelector('.comment_form');
        addSubmitForm(commentForm, postID);
    });

});

function addSubmitForm(commentForm, postID) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(commentForm);
        const content = formData.get('content');
        const comment = {
            postID: postID,
            authorID: '67354d9ae9a39ec7d653d375',
            content
        };
        console.log(comment);
        commentForm.reset();
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
    });
}

function refreshPosts(posts) {
    const postsContainer = document.querySelector('#posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.id = post._id;
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content}</p>
            ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image">'` : ''}
            <form class="comment_form">
                <input type="text" name="content" placeholder="Comment">
                <button type="submit">Submit</button>
            </form>
        `;
        postsContainer.appendChild(postElement);
        addSubmitForm(postElement.querySelector('.comment_form'), post._id);
    })
}

async function getPosts(searchParams) {
    let url = '/posts';
    if (searchParams) {
        url += `?q=${searchParams}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
