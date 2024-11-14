document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#post_form');

    form.addEventListener('submit', (e) => {
        const formData = new FormData(form);
        const title = formData.get('title');
        const content = formData.get('content');
        const post = {
            title,
            content,
            authorID: '67354d9ae9a39ec7d653d375',
        };
        console.log(post);
        form.reset();
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
    });

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