import React, { useState } from 'react';
import { format } from 'date-fns';

const UserAttendance: React.FC = () => {
  const [attendance, setAttendance] = useState<{
    date: string;
    checkIn: string;
    checkOut: string | null;
  }[]>([]);

  const handleCheckIn = () => {
    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');
    const time = format(now, 'HH:mm');

    setAttendance(prev => {
      const todayAttendance = prev.find(a => a.date === today);
      if (todayAttendance) {
        return prev;
      }
      return [...prev, { date: today, checkIn: time, checkOut: null }];
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');
    const time = format(now, 'HH:mm');

    setAttendance(prev => {
      return prev.map(a => {
        if (a.date === today && !a.checkOut) {
          return { ...a, checkOut: time };
        }
        return a;
      });
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today's Attendance</h2>
          <div className="space-x-4">
            <button
              onClick={handleCheckIn}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Check In
            </button>
            <button
              onClick={handleCheckOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Check Out
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Attendance History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {attendance.map((record, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.checkOut || 'Not checked out'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserAttendance;
