import React from 'react';
import { announcements } from '../data/announcements';
import { events } from '../data/events';
import { communications } from '../data/communications';
import { hackathons } from '../data/hackathons';
import AnnouncementCard from '../components/AnnouncementCard';
import EventCard from '../components/EventCard';
import CommunicationCard from '../components/CommunicationCard';
import HackathonCard from '../components/HackathonCard';
import type { Page } from '../App';

interface DashboardProps {
  setActivePage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage }) => {
  const recentAnnouncements = announcements.slice(0, 2);
  const upcomingEvents = events.slice(0, 2);
  const latestCommunications = communications.filter(c => !c.read).slice(0, 2);
  const approvedHackathons = hackathons.filter(h => h.status === 'approved').slice(0, 2);

  const SectionHeader: React.FC<{ title: string; page: Page }> = ({ title, page }) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-slate-700">{title}</h2>
      <button 
        onClick={() => setActivePage(page)}
        className="text-sm font-medium text-sky-600 hover:text-sky-800 transition-colors"
      >
        View All &rarr;
      </button>
    </div>
  );

  return (
    <div className="space-y-12">
      <section>
        <SectionHeader title="Latest Announcements" page="announcements" />
        <div className="grid gap-6 md:grid-cols-2">
          {recentAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Upcoming Events" page="events" />
        <div className="grid gap-6 md:grid-cols-2">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Approved Hackathons" page="hackathons" />
        <div className="grid gap-6 md:grid-cols-2">
          {approvedHackathons.length > 0 ? (
            approvedHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))
           ) : (
            <div className="md:col-span-2 text-center p-8 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-slate-500">No approved hackathons at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
      
      <section>
        <SectionHeader title="Unread Communications" page="communications" />
        <div className="grid gap-6 md:grid-cols-2">
          {latestCommunications.length > 0 ? (
            latestCommunications.map((comm) => (
              <CommunicationCard key={comm.id} communication={comm} />
            ))
          ) : (
            <div className="md:col-span-2 text-center p-8 bg-white rounded-lg shadow-sm border border-slate-200">
              <p className="text-slate-500">No unread communications. You're all caught up!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
