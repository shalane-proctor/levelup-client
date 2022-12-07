import { clientCredentials } from '../client';

const getEvents = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleEvent = (eventId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/events/${eventId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        description: data.description,
        date: data.date,
        time: data.time,
        game: data.game,
        organizer: data.organizer,
      });
    })
    .catch((error) => reject(error));
});

const createEvent = (event) => new Promise((resolve, reject) => {
  const eventObj = {
    description: event.description,
    date: event.date,
    time: event.time,
    game: Number(event.game),
    organizer: event.organizer,
  };
  fetch(`${clientCredentials.databaseURL}/events`, {
    method: 'POST',
    body: JSON.stringify(eventObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateEvent = (event, id) => new Promise((resolve, reject) => {
  const eventObj = {
    description: event.description,
    date: event.date,
    time: event.time,
    game: Number(event.game),
    organizer: event.organizer,
  };
  fetch(`${clientCredentials.databaseURL}/events/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventObj),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getEvents, getSingleEvent, createEvent, updateEvent,
};
