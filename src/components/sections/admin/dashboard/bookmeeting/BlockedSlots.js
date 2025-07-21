'use client';

import { useEffect, useState } from 'react';
import {
  getALLSlots,
  blockSlots,
  unblockSlots,
  getTimeSlotsForDate,
} from '@/services/apis';

const getToday = () => new Date().toISOString().split('T')[0];

const getNext7DaysDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 6);
  return date.toISOString().split('T')[0];
};

const BlockedSlots = () => {
  const [slotsData, setSlotsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchWeekData = async () => {
    try {
      setLoading(true);
      const result = await getALLSlots();
      const filtered = result.filter(
        (entry) => entry.date >= getToday() && entry.date <= getNext7DaysDate()
      );
      const sorted = filtered.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      setSlotsData(sorted);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
      setSlotsData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeekData();
  }, []);

  const handleBlockSlot = async (date, time) => {
    try {
      setLoading(true);
      await blockSlots(date, [time]);
      setMessage(`${time} blocked on ${date}.`);
      await fetchWeekData();
    } catch (err) {
      console.error(err);
      setMessage('Block failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnblockSlot = async (date, time) => {
    try {
      setLoading(true);
      await unblockSlots(date, [time]);
      setMessage(`${time} unblocked on ${date}.`);
      await fetchWeekData();
    } catch (err) {
      console.error(err);
      setMessage('Unblock failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white pt-16 dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600 dark:text-indigo-400">
        Admin Time Slot 
      </h2>

      {message && (
        <p className="mb-4 text-center text-sm text-blue-600 dark:text-blue-400">
          {message}
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-4">
          All Slots (Today to Next 7 Days)
        </h3>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
        ) : slotsData.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">No slot data available.</p>
        ) : (
          <table className="w-full text-sm border dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="p-2 border dark:border-gray-700">Date</th>
                <th className="p-2 border dark:border-gray-700">Time</th>
                <th className="p-2 border dark:border-gray-700">Status</th>
                <th className="p-2 border dark:border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {slotsData.flatMap((day) =>
                day.slots.map((slot) => (
                  <tr
                    key={`${day.date}-${slot.time}`}
                    className="text-center dark:text-white"
                  >
                    <td className="border p-2 dark:border-gray-700">{day.date}</td>
                    <td className="border p-2 dark:border-gray-700">{slot.time}</td>
                    <td className="border p-2 dark:border-gray-700 font-medium">
                      {slot.isBlocked ? (
                        <span className="text-red-600 dark:text-red-400">🛑 Blocked</span>
                      ) : slot.isAvailable ? (
                        <span className="text-green-600 dark:text-green-400">✅ Available</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">⏳ Past</span>
                      )}
                    </td>
                    <td className="border p-2 dark:border-gray-700">
                      {slot.isBlocked ? (
                        <button
                          onClick={() => {
                              handleUnblockSlot(day.date, slot.time);
                          }}
                          className="px-3 py-1 rounded text-white text-xs bg-yellow-500 hover:bg-yellow-600"
                          disabled={loading}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                              handleBlockSlot(day.date, slot.time);
                          }}
                          className="px-3 py-1 rounded text-white text-xs bg-red-500 hover:bg-red-600"
                          disabled={!slot.isAvailable || loading}
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>Note: Only slots from today to next 7 days can be modified.</p>
        <p className="mt-1">
          Current Date: <b>{getToday()}</b> | Ends On: <b>{getNext7DaysDate()}</b>
        </p>
      </div>
    </div>
  );
};

export default BlockedSlots;
