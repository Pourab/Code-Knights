
import React from 'react';
import { communications } from '../data/communications';
import CommunicationCard from '../components/CommunicationCard';

const Communications: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-6">All Communications</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {communications.map((comm) => (
          <CommunicationCard key={comm.id} communication={comm} />
        ))}
      </div>
    </div>
  );
};

export default Communications;
