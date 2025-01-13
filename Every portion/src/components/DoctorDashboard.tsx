import React, { useState } from 'react';
import { Users, Activity, ClipboardList } from 'lucide-react';
import PatientDetailView from './PatientDetailView';
import { Doctor, Patient } from '../types';

interface DoctorDashboardProps {
  doctor: Doctor;
  patients: Patient[];
  onLogout: () => void;
}

const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ doctor, patients, onLogout }) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  if (selectedPatient) {
    return (
      <PatientDetailView
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
        doctor={doctor}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 mr-2" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
              <p className="text-sm text-gray-600">{doctor.position} - {doctor.department}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">My Patients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                    <p className="text-sm text-gray-600">Patient ID: {patient.id}</p>
                  </div>
                  <ClipboardList className="h-6 w-6 text-blue-600" />
                </div>

                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Conditions: </span>
                    <span className="text-gray-600">
                      {patient.medicalHistory.conditions.join(', ')}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Medications: </span>
                    <span className="text-gray-600">
                      {patient.medicalHistory.medications.join(', ')}
                    </span>
                  </div>
                </div>

                <button
                  className="mt-4 w-full bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;