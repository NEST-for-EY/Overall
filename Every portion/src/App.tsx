import React, { useState } from 'react';
import Login from './components/Login';
import PatientDashboard from './components/PatientDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import { AuthState } from './types';
import usersData from './data/users.json';

function App() {
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    userType: null,
    isAuthenticated: false
  });

  const handleLogin = (user: any, type: 'doctor' | 'patient') => {
    setAuth({
      user,
      userType: type,
      isAuthenticated: true
    });
  };

  const handleLogout = () => {
    setAuth({
      user: null,
      userType: null,
      isAuthenticated: false
    });
  };

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  if (auth.userType === 'patient') {
    return (
      <PatientDashboard
        patient={auth.user}
        doctorData={usersData}
      />
    );
  }

  // Doctor's view
  const doctorPatients = usersData.patients.filter(
    (patient) => auth.user?.patients?.includes(patient.id)
  );

  return (
    <DoctorDashboard
      doctor={auth.user}
      patients={doctorPatients}
      onLogout={handleLogout}
    />
  );
}

export default App;