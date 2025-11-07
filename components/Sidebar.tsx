import React, { useState } from 'react';
import type { Page } from '../App';
import Icon from './Icon';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onLogout: () => void;
  userEmail: string;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  iconName: string;
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ page, currentPage, setCurrentPage, iconName, children, onClick }) => {
  const isActive = currentPage === page;
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        setCurrentPage(page);
        if (onClick) onClick();
      }}
      className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 w-full ${
        isActive
          ? 'bg-sky-600 text-white'
          : 'text-slate-100 hover:bg-sky-800 hover:text-white'
      }`}
    >
      <Icon name={iconName} className="h-5 w-5 mr-3" />
      <span>{children}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, onLogout, userEmail }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <div className="bg-sky-700 text-white w-64 min-h-screen flex flex-col p-4 shadow-lg">
      <div className="flex items-center flex-shrink-0 px-4 mb-8">
        <Icon name="logo" className="h-10 w-10 text-white" />
        <span className="ml-3 text-2xl font-bold">College Connect</span>
      </div>
      <nav className="flex-1 space-y-2">
        <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="dashboard">Dashboard</NavLink>
        <NavLink page="announcements" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="announcement">Announcements</NavLink>
        <NavLink page="events" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="event">Events</NavLink>
        <NavLink page="communications" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="communication">Comms</NavLink>
        <NavLink page="hackathons" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="hackathon">Hackathons</NavLink>
      </nav>
      <div className="pt-4 border-t border-sky-600">
         <div className="px-4 py-3 flex items-center">
            <Icon name="user" className="h-8 w-8 text-slate-300 border rounded-full p-1" />
            <div className="ml-3">
              <p className="text-sm font-medium text-white truncate">{userEmail}</p>
            </div>
          </div>
        <button
          onClick={onLogout}
          className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 w-full text-slate-100 hover:bg-sky-800 hover:text-white"
        >
          <Icon name="logout" className="h-5 w-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden bg-sky-700 text-white flex justify-between items-center p-4 w-full">
         <div className="flex items-center text-white">
            <Icon name="logo" className="h-8 w-8 text-white" />
            <span className="ml-2 text-xl font-bold">College Connect</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <Icon name="menu" className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Sidebar (Drawer) */}
      <div className={`fixed inset-0 z-30 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="relative">
          <SidebarContent />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;