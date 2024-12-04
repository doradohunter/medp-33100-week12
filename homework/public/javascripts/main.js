document.addEventListener('DOMContentLoaded', function () {
  const addForm = document.getElementById('addRestaurantForm');
  const editForm = document.getElementById('editRestaurantForm');
  const modal = document.getElementById('editModal');

  // Add new restaurant
  addForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(addForm);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch('/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Add response:', result);
      window.location.reload();
    } catch (error) {
      console.error('Add error:', error);
      alert('Error adding restaurant');
    }
  });

  // Edit restaurant
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', e => {
      console.log('Edit button clicked');
      const card = e.target.closest('.nyc-card');
      const id = card.dataset.id;
      const name = card.querySelector('.nyc-name').textContent;
      const type = card.querySelector('.nyc-type').textContent.replace('Type: ', '');
      const borough = card.querySelector('.nyc-borough').textContent.replace('Borough: ', '');

      editForm.elements.name.value = name;
      editForm.elements.type.value = type;
      editForm.elements.borough.value = borough;
      editForm.elements.restaurantId.value = id;
      modal.style.display = 'block';
    });
  });

  // Update restaurant
  editForm.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(editForm);
    const id = formData.get('restaurantId');
    const data = {
      name: formData.get('name'),
      type: formData.get('type'),
      borough: formData.get('borough'),
    };

    try {
      const response = await fetch(`/restaurants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Update response:', result);
      window.location.reload();
    } catch (error) {
      console.error('Update error:', error);
      alert('Error updating restaurant');
    }
  });

  // Delete restaurant
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', async e => {
      e.preventDefault();
      console.log('Delete button clicked');
      if (confirm('Are you sure you want to delete this restaurant?')) {
        const card = e.target.closest('.nyc-card');
        const id = card.dataset.id;
        console.log('Attempting to delete restaurant with ID:', id);

        try {
          const response = await fetch(`/restaurants/${id}`, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          console.log('Delete response:', result);

          if (result.success) {
            card.remove();
            console.log('Restaurant deleted successfully');
          } else {
            alert('Failed to delete restaurant');
          }
        } catch (error) {
          console.error('Delete error:', error);
          alert('Error deleting restaurant');
        }
      }
    });
  });

  // Close modal
  document.querySelector('.cancel-btn').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
