import React, { useState } from 'react';
import type { UserRole } from '../App';
import Icon from '../components/Icon';

interface LoginProps {
  onLogin: (role: UserRole, email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = (role: UserRole) => {
    if (isEmailValid) {
      onLogin(role, email);
    }
  };
  
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
      <div className="flex justify-center items-center mb-6">
        <Icon name="logo" className="h-12 w-12 text-sky-600" />
        <h1 className="text-3xl font-bold text-slate-800 ml-3">College Connect</h1>
      </div>
      <p className="text-slate-600 mb-8">Enter your college email and select your role to continue.</p>

      <div className="mb-6">
          <label htmlFor="email" className="sr-only">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g., your.name@college.edu"
            className="mt-1 block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
          />
      </div>
      
      <div className="space-y-4">
        <button
          onClick={() => handleLogin('student')}
          disabled={!isEmailValid}
          className="w-full bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-700 transition-colors duration-300 text-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Login as Student
        </button>
        <button
          onClick={() => handleLogin('teacher')}
          disabled={!isEmailValid}
          className="w-full bg-slate-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors duration-300 text-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Login as Teacher
        </button>
      </div>
    </div>
  );
};

export default Login;