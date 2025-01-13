import React, { useState } from 'react';
import { Stethoscope, User } from 'lucide-react';
import usersData from '../data/users.json';

interface LoginProps {
  onLogin: (user: any, type: 'doctor' | 'patient') => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'doctor' | 'patient'>('doctor');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = userType === 'doctor' ? usersData.doctors : usersData.patients;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      onLogin(user, userType);
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">HealthTrack Login</h1>
          <p className="text-gray-600">Access your medical dashboard</p>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              userType === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setUserType('doctor')}
          >
            <Stethoscope className="mr-2" size={20} />
            Doctor
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              userType === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setUserType('patient')}
          >
            <User className="mr-2" size={20} />
            Patient
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="mb-4 text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}