
import React, { useState } from 'react';
import type { Page } from '../App';
import Icon from './Icon';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
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
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-sky-600 text-white'
          : 'text-slate-100 hover:bg-sky-800 hover:text-white'
      }`}
    >
      <Icon name={iconName} className="h-5 w-5 mr-2" />
      {children}
    </a>
  );
};


const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
               <div className="flex items-center text-white">
                <Icon name="logo" className="h-8 w-8 text-white" />
                <span className="ml-2 text-xl font-bold">College Connect</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                 <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="dashboard">Dashboard</NavLink>
                 <NavLink page="announcements" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="announcement">Announcements</NavLink>
                 <NavLink page="events" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="event">Events</NavLink>
                 <NavLink page="communications" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="communication">Comms</NavLink>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-sky-700 inline-flex items-center justify-center p-2 rounded-md text-sky-100 hover:text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-700 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <Icon name="close" className="block h-6 w-6" />
              ) : (
                <Icon name="menu" className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink page="dashboard" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</NavLink>
             <NavLink page="announcements" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="announcement" onClick={() => setIsMobileMenuOpen(false)}>Announcements</NavLink>
             <NavLink page="events" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="event" onClick={() => setIsMobileMenuOpen(false)}>Events</NavLink>
             <NavLink page="communications" currentPage={currentPage} setCurrentPage={setCurrentPage} iconName="communication" onClick={() => setIsMobileMenuOpen(false)}>Communications</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
