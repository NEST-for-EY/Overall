import React from 'react';
import { Activity, Thermometer, Heart, Wind, Footprints, MessageCircle } from 'lucide-react';
import { Patient } from '../types';

interface PatientDashboardProps {
  patient: Patient;
  doctorData: any;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ patient, doctorData }) => {
  const doctor = doctorData.doctors.find((d: any) => d.id === patient.assignedDoctor);
  const recommendations = doctor?.recommendations?.[patient.id] || [];
  const doctorNote = doctor?.notes?.[patient.id];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-red-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">NEST</h1>
          </div>
          <nav className="flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Health Status</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Progress</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Recommendations</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Chatbot</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">Reports</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Thermometer className="h-6 w-6 text-blue-500 mr-2" />
              <h3 className="text-lg font-medium">Temperature</h3>
            </div>
            <p className="text-3xl font-bold mb-2">{patient.healthMetrics.temperature.value}°F</p>
            <p className="text-green-500">{patient.healthMetrics.temperature.status}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-red-500 mr-2" />
              <h3 className="text-lg font-medium">Heart Rate</h3>
            </div>
            <p className="text-3xl font-bold mb-2">{patient.healthMetrics.heartRate.value} BPM</p>
            <p className="text-green-500">{patient.healthMetrics.heartRate.status}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Wind className="h-6 w-6 text-green-500 mr-2" />
              <h3 className="text-lg font-medium">Air Quality</h3>
            </div>
            <p className="text-3xl font-bold mb-2">{patient.healthMetrics.airQuality.value}</p>
            <p className="text-green-500">{patient.healthMetrics.airQuality.status}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <Footprints className="h-6 w-6 text-purple-500 mr-2" />
              <h3 className="text-lg font-medium">Steps</h3>
            </div>
            <p className="text-3xl font-bold mb-2">{patient.healthMetrics.steps.value}</p>
            <p className="text-yellow-500">{patient.healthMetrics.steps.status}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-4">Activity Progress</h3>
              <div className="h-64 bg-gray-50 rounded-lg"></div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Treatment History</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Doctor</th>
                    <th className="pb-4">Notes</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {patient.treatmentHistory?.map((treatment, index) => (
                    <tr key={index} className="border-t">
                      <td className="py-4">{treatment.date}</td>
                      <td className="py-4">{treatment.type}</td>
                      <td className="py-4">{treatment.doctor}</td>
                      <td className="py-4">{treatment.notes}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          treatment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {treatment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-xl font-semibold mb-4">Doctor's Recommendations</h3>
              {recommendations.map((rec: any, index: number) => (
                <div key={index} className="mb-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    {rec.type === 'medication' ? (
                      <div className="p-2 bg-blue-100 rounded-full mr-3">💊</div>
                    ) : (
                      <div className="p-2 bg-green-100 rounded-full mr-3">🏃</div>
                    )}
                    <p className="text-gray-700">{rec.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {doctorNote && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-6 w-6 text-gray-500 mr-2" />
                  <h3 className="text-xl font-semibold">Note from Doctor</h3>
                </div>
                <div className="p-4 bg-red-500 text-white rounded-lg">
                  <p>{doctorNote}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;