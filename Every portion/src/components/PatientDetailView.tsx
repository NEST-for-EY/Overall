import React from 'react';
import { ArrowLeft, Activity, Brain, Calendar, FileText, LineChart, MessageSquare } from 'lucide-react';
import { Patient, Doctor } from '../types';

interface PatientDetailViewProps {
  patient: Patient;
  doctor: Doctor;
  onBack: () => void;
}

const PatientDetailView: React.FC<PatientDetailViewProps> = ({ patient, doctor, onBack }) => {
  const recommendations = doctor?.recommendations?.[patient.id] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Patient List
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Short Report Section */}
        <div className="bg-red-400 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white">Short Report by AI</h2>
          <p className="text-white mt-2">
            Patient shows stable vital signs with controlled hypertension. 
            Regular medication adherence observed.
          </p>
        </div>

        {/* Bio Data Section */}
        <div className="bg-gray-200 rounded-xl p-6 flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Bio Data</h2>
            <div className="space-y-1">
              <p><span className="font-medium">Name:</span> {patient.name}</p>
              <p><span className="font-medium">ID:</span> {patient.id}</p>
              <p><span className="font-medium">Conditions:</span> {patient.medicalHistory.conditions.join(', ')}</p>
              <p><span className="font-medium">Medications:</span> {patient.medicalHistory.medications.join(', ')}</p>
            </div>
          </div>
          <div className="bg-green-400 rounded-full p-4">
            <img
              src="https://images.unsplash.com/photo-1532170579297-281918c8ae72?w=64&h=64&fit=crop"
              alt="Patient"
              className="w-16 h-16 rounded-full"
            />
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Data Visualization</h2>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(patient.healthMetrics || {}).map(([key, metric]: [string, any]) => (
              <div key={key} className="bg-blue-400 p-4 rounded-xl text-white">
                <h3 className="font-medium capitalize">{key}</h3>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm">{metric.status}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-blue-400 p-4 rounded-xl h-48">
              {/* Chart placeholder */}
              <div className="w-full h-full flex items-center justify-center">
                <LineChart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-400 p-4 rounded-xl h-[70px]">
                <h3 className="text-white font-medium">Summary 1</h3>
              </div>
              <div className="bg-blue-400 p-4 rounded-xl h-[70px]">
                <h3 className="text-white font-medium">Summary 2</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Report Generation Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-400 p-6 rounded-xl">
            <h3 className="text-white font-semibold mb-4">Previous Reports</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded-lg">Report 01</div>
              <div className="bg-white p-2 rounded-lg">Report 02</div>
            </div>
          </div>
          <div className="bg-blue-600 p-6 rounded-xl">
            <h3 className="text-white font-semibold mb-4">AI Report</h3>
            <div className="mt-auto">
              <div className="bg-white p-2 rounded-lg flex">
                <input
                  type="text"
                  placeholder="Add to report"
                  className="flex-1 border-none outline-none"
                />
                <button className="ml-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-400 p-6 rounded-xl">
            <h3 className="text-white font-semibold mb-4">Calendar</h3>
            <div className="space-y-2">
              {Array(5).fill(0).map((_, i) => (
                <div key={i} className="border-b border-blue-300 py-2"></div>
              ))}
            </div>
          </div>
          <div className="bg-blue-400 p-6 rounded-xl">
            <h3 className="text-white font-semibold mb-4">Generate Meet</h3>
            <input
              type="text"
              placeholder="Meeting title"
              className="w-full p-2 rounded-lg mb-4"
            />
            <div className="flex gap-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-full">
                Offline
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full">
                Online
              </button>
            </div>
          </div>
        </div>

        {/* Personalized AI Section */}
        <div className="bg-blue-400 p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-4">Personalized AI with patient data</h3>
          <div className="bg-white p-2 rounded-lg flex">
            <input
              type="text"
              placeholder="Ask AI about patient's health..."
              className="flex-1 border-none outline-none"
            />
            <button className="ml-2">
              <MessageSquare className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDetailView;