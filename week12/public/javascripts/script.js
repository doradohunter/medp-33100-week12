document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#event_form');
    let editingEventId = null;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const eventData = new FormData(form);
        const eventDataObject = {
            eventname: eventData.get('eventname'),
            eventscorerank: eventData.get('eventscorerank'),
            eventpointrank: eventData.get('eventpointrank'),
        };

        try {
            if (editingEventId) {
                await fetch(`/events/${editingEventId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventDataObject)
                });

                const eventDiv = document.querySelector(`.events[data-id='${editingEventId}']`);
                eventDiv.querySelector('p:nth-child(1)').innerHTML = `<strong>Event Name:</strong> ${eventDataObject.eventname}`;
                eventDiv.querySelector('p:nth-child(2)').innerHTML = `<strong>Event Score Rank:</strong> ${eventDataObject.eventscorerank}`;
                eventDiv.querySelector('p:nth-child(3)').innerHTML = `<strong>Event Point Rank:</strong> ${eventDataObject.eventpointrank}`;

                editingEventId = null;
            } else {
                await fetch('/events', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventDataObject)
                });

                const eventDiv = document.createElement('div');
                eventDiv.classList.add('events');
                eventDiv.innerHTML = `
                    <p><strong>Event Name:</strong> ${eventDataObject.eventname}</p>
                    <p><strong>Event Score Rank:</strong> ${eventDataObject.eventscorerank}</p>
                    <p><strong>Event Point Rank:</strong> ${eventDataObject.eventpointrank}</p>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                `;

                const eventsContainer = document.querySelector('.events-container');
                eventsContainer.appendChild(eventDiv);
            }

            form.reset();
        } catch (error) {
            console.error('Error handling event:', error);
        }
    });

    document.querySelector('.events-container').addEventListener('click', async (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const eventDiv = e.target.closest('.events');
            const eventId = eventDiv.getAttribute('data-id');
            const eventname = eventDiv.querySelector('p:nth-child(1)').innerText.split(': ')[1];
            const eventscorerank = eventDiv.querySelector('p:nth-child(2)').innerText.split(': ')[1];
            const eventpointrank = eventDiv.querySelector('p:nth-child(3)').innerText.split(': ')[1];

            document.querySelector('#eventname').value = eventname;
            document.querySelector('#eventscorerank').value = eventscorerank;
            document.querySelector('#eventpointrank').value = eventpointrank;

            editingEventId = eventId;
        }

        if (e.target.classList.contains('delete-btn')) {
            const eventDiv = e.target.closest('.events');
            const eventId = eventDiv.getAttribute('data-id');

            try {
                await fetch(`/events/${eventId}`, {
                    method: 'DELETE',
                });

                eventDiv.remove();
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    });
});
