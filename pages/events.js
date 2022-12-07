import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import EventCard from '../components/event/EventCard';
import { getEvents } from '../utils/data/eventData';

function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);
  console.log(events, typeof events);
  return (
    <article className="events">
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard game={event.game.title} description={event.description} date={event.date} time={event.time} organizer={event.organizer.bio} />
        </section>
      ))}
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
    </article>
  );
}

export default Events;
