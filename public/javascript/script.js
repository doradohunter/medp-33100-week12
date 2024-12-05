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
      activityInput.name = 'activity';
      activityInput.id = 'activity-input';
      activity.innerHTML = '';
      activity.appendChild(activityInput);

      const saveButton = document.createElement('button');
      saveButton.classList.add('save-button');
      saveButton.innerText = 'save';
      saveButton.addEventListener('click', async () => {
        const newValue = activityInput.value;

        const updatedValue = {
          activity: newValue,
        } 
        await updateActivity(updatedValue);

        activity.innerHTML = '';
        const updatedPTag = document.createElement('p');
        updatedPTag.innerText = newValue;
        activity.appendChild(updatedPTag);

        const newEditButton = document.createElement('button');
        saveButton.classList.add('edit-button');

        saveButton.innerHTML = '';
        saveButton.appendChild(newEditButton);
      })
      edit.innerHTML = '';
      edit.appendChild(saveButton);


    });
  });
});


async function updateActivity(updatedValue) {
  fetch('/posts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedValue),
  });
}