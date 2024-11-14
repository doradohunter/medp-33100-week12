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

});
