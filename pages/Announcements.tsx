
import React from 'react';
import { announcements } from '../data/announcements';
import AnnouncementCard from '../components/AnnouncementCard';

const Announcements: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">All Announcements</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
      </div>
    </div>
  );
};

export default Announcements;
