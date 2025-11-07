
import React from 'react';
import type { Communication } from '../types';
import Card from './Card';

const CommunicationCard: React.FC<{ communication: Communication }> = ({ communication }) => {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-slate-900">{communication.subject}</h3>
        {!communication.read && (
          <span className="ml-3 inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-sky-500"></span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{communication.content}</p>
      <div className="mt-4 pt-4 border-t border-slate-200 text-sm text-slate-500">
        <p><span className="font-semibold">From:</span> {communication.from}</p>
        <p><span className="font-semibold">To:</span> {communication.to}</p>
        <p className="mt-1">{new Date(communication.date).toLocaleString()}</p>
      </div>
    </Card>
  );
};

export default CommunicationCard;
