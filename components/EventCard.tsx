
import React from 'react';
import type { Event } from '../types';
import Card from './Card';

const eventTypeColors: { [key in Event['type']]: string } = {
  workshop: 'bg-indigo-100 text-indigo-800',
  seminar: 'bg-purple-100 text-purple-800',
  fest: 'bg-pink-100 text-pink-800',
  sports: 'bg-green-100 text-green-800',
};

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const eventDate = new Date(event.date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleString('en-US', { month: 'short' });

  return (
    <Card className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <span
              className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${eventTypeColors[event.type]}`}
            >
              {event.type}
            </span>
            <h3 className="mt-2 text-xl leading-7 font-bold text-slate-900">{event.title}</h3>
          </div>
          <div className="flex-shrink-0 ml-4 text-center bg-slate-100 rounded-lg p-2 w-16">
            <p className="text-2xl font-bold text-sky-600">{day}</p>
            <p className="text-sm font-medium text-slate-600">{month.toUpperCase()}</p>
          </div>
        </div>
        <p className="mt-3 text-base text-slate-600">{event.description}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-500 space-y-1">
        <p><span className="font-semibold">Time:</span> {event.time}</p>
        <p><span className="font-semibold">Location:</span> {event.location}</p>
        <p><span className="font-semibold">Organizer:</span> {event.organizer}</p>
      </div>
    </Card>
  );
};

export default EventCard;
