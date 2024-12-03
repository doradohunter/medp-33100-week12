async function updateAnimal(event, id) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const data = {
    name: formData.get('name'),
    habitatName: formData.get('habitatName'),
    funFact: formData.get('funFact'),
  };

  try {
    const response = await fetch(`/animals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert('Failed to update animal.');
    }
  } catch (error) {
    console.error('Error updating animal:', error);
  }
}

async function deleteAnimal(id) {
      try {
        const response = await fetch(`/delete/${id}`, {
          method: 'DELETE',
        });
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    
  }