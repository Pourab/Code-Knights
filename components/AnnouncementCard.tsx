
import React from 'react';
import type { Announcement } from '../types';
import Card from './Card';

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  return (
    <Card className="flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-sm font-semibold text-sky-600 uppercase tracking-wide">{announcement.department}</div>
        <h3 className="mt-1 text-xl leading-7 font-bold text-slate-900">{announcement.title}</h3>
        <p className="mt-3 text-base text-slate-600">{announcement.content}</p>
      </div>
      <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-500">
        <p>By: {announcement.author}</p>
        <p>Date: {new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </Card>
  );
};

export default AnnouncementCard;
