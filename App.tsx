import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import Communications from './pages/Communications';
import Hackathons from './pages/Hackathons';
import StudyBuddy from './components/StudyBuddy';
import Login from './pages/Login';

export type Page = 'dashboard' | 'announcements' | 'events' | 'communications' | 'hackathons';
export type UserRole = 'student' | 'teacher';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleLogin = (role: UserRole, email: string) => {
    setUserRole(role);
    setUserEmail(email);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserEmail(null);
  };

  const renderPage = () => {
    if (!userRole || !userEmail) {
      return <Login onLogin={handleLogin} />;
    }
    
    switch (currentPage) {
      case 'announcements':
        return <Announcements />;
      case 'events':
        return <Events />;
      case 'communications':
        return <Communications />;
      case 'hackathons':
        return <Hackathons userRole={userRole} userEmail={userEmail} />;
      case 'dashboard':
      default:
        return <Dashboard setActivePage={setCurrentPage} />;
    }
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex items-center justify-center p-4">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
          onLogout={handleLogout}
          userEmail={userEmail ?? 'No user'}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 h-screen overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      <StudyBuddy />
    </div>
  );
};

export default App;