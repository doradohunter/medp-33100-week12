document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#post-habit');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const formDataObject = {
      activity: formData.get('activity'),
      category: formData.get('category'),
      description: formData.get('description'),
      frequency: formData.get('frequency'),
    };

    fetch('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataObject),
    });
  });
});
