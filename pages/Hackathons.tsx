import React, { useState } from 'react';
import { hackathons as initialHackathons } from '../data/hackathons';
import HackathonCard from '../components/HackathonCard';
import Card from '../components/Card';
import type { UserRole } from '../App';
import type { Hackathon } from '../types';

interface HackathonsProps {
  userRole: UserRole;
  userEmail: string;
}

const Hackathons: React.FC<HackathonsProps> = ({ userRole, userEmail }) => {
  const [hackathons, setHackathons] = useState<Hackathon[]>(initialHackathons);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPoster, setNewPoster] = useState<string | null>(null);

  const handleApprove = (id: number) => {
    setHackathons(
      hackathons.map(h => (h.id === id ? { ...h, status: 'approved' } : h))
    );
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPoster(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) return;
    
    const newHackathon: Hackathon = {
      id: Date.now(), // simple unique id
      title: newTitle,
      description: newDescription,
      submittedBy: userEmail,
      status: 'pending',
      posterUrl: newPoster ?? undefined,
    };

    setHackathons([newHackathon, ...hackathons]);
    setNewTitle('');
    setNewDescription('');
    setNewPoster(null);
  };

  const pendingHackathons = hackathons.filter(h => h.status === 'pending');
  const approvedHackathons = hackathons.filter(h => h.status === 'approved');

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Hackathons</h1>
      
      {userRole === 'student' && (
        <Card>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Submit a Hackathon Idea</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input
                id="title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g., AI for Social Good"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                id="description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Describe the hackathon's theme and goals."
                rows={4}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="poster" className="block text-sm font-medium text-slate-700">Poster Image (Optional)</label>
              <input
                id="poster"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handlePosterChange}
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
              />
            </div>
            {newPoster && (
              <div className="mt-2">
                <p className="text-sm font-medium text-slate-700 mb-1">Poster Preview:</p>
                <img src={newPoster} alt="Poster preview" className="max-h-40 rounded-lg shadow-sm border border-slate-200" />
              </div>
            )}
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Submit for Approval
            </button>
          </form>
        </Card>
      )}

      {userRole === 'teacher' && pendingHackathons.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-slate-700 mb-4">Pending Approval</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pendingHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} userRole={userRole} onApprove={handleApprove} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Approved Hackathons</h2>
        {approvedHackathons.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {approvedHackathons.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        ) : (
          <Card><p className="text-slate-500">No approved hackathons yet. Check back later!</p></Card>
        )}
      </section>
    </div>
  );
};

export default Hackathons;
