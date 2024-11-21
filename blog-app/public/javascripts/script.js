document.addEventListener('DOMContentLoaded', () => {
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
    });

});
