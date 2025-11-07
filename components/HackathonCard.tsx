import React from 'react';
import type { Hackathon } from '../types';
import type { UserRole } from '../App';
import Icon from './Icon';

interface HackathonCardProps {
  hackathon: Hackathon;
  userRole?: UserRole;
  onApprove?: (id: number) => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon, userRole, onApprove }) => {
  const isPending = hackathon.status === 'pending';

  return (
    <div className={`rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border flex flex-col h-full ${
      isPending ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'
    }`}>
      {hackathon.posterUrl && (
        <img src={hackathon.posterUrl} alt={`${hackathon.title} Poster`} className="w-full h-40 object-cover" />
      )}
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-xl leading-7 font-bold text-slate-900 pr-2">{hackathon.title}</h3>
            <span className={`flex-shrink-0 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${
              isPending
                ? 'bg-amber-100 text-amber-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {hackathon.status}
            </span>
          </div>
          <p className="mt-3 text-base text-slate-600">{hackathon.description}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center">
          <div className="text-sm text-slate-500">
              <p>Submitted by: <span className="font-medium">{hackathon.submittedBy}</span></p>
          </div>
          {userRole === 'teacher' && isPending && onApprove && (
            <button 
              onClick={() => onApprove(hackathon.id)}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
              <Icon name="approve" className="h-4 w-4 mr-1" />
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;
