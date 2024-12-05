document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#post-habit');
  const allHabits = document.querySelectorAll('.each-habit');

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

  allHabits.forEach((habit) => {
    const edit = habit.querySelector('.edit-button');
    edit.addEventListener('click', () => {
      const activity = habit.querySelector('.activity');

      const activityInput = document.createElement('input');
      activityInput.value = activity.innerText;

      activity.innerHTML = '';
      activity.appendChild(activityInput);
    });
  });
});
