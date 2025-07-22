"use client";
import React, { useEffect, useState } from "react";
import { getAllMeetings, deleteMeeting } from "@/services/apis";

const MeetingList = () => {
  const [meetingsByDate, setMeetingsByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  const parseTime = (date, timeStr) => {
    const normalized = timeStr.replace(/(AM|PM)/i, " $1").trim();
    return new Date(`${date} ${normalized}`);
  };

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const resp = await getAllMeetings();
      const grouped = {};

      resp.meetings
        .sort((a, b) => {
          const dateCompare = new Date(a.date) - new Date(b.date);
          if (dateCompare !== 0) return dateCompare;
          return parseTime(a.date, a.time) - parseTime(b.date, b.time);
        })
        .forEach((meeting) => {
          if (!grouped[meeting.date]) grouped[meeting.date] = [];
          grouped[meeting.date].push(meeting);
        });

      setMeetingsByDate(grouped);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching meetings:", err);
      setError(err.message || "Failed to fetch meetings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this meeting?")) return;
    try {
      await deleteMeeting(id);
      fetchMeetings(); // ✅ Refresh after deletion
    } catch (err) {
      alert("Failed to delete meeting");
      console.error(err);
    }
  };

  const filteredDates = selectedDate
    ? Object.keys(meetingsByDate).filter((d) => d === selectedDate)
    : Object.keys(meetingsByDate);

  return (
    <section className="py-16 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Meetings Booked
      </h2>

      {/* Filter Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Filter by Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate("")}
            className="ml-4 text-sm text-blue-500 dark:text-blue-400 underline"
          >
            Clear Filter
          </button>
        )}
      </div>

      {loading && <p className="text-gray-600 dark:text-gray-300">Loading...</p>}
      {error && <p className="text-red-500 dark:text-red-400">{error}</p>}
      {!loading && !error && filteredDates.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">No meetings scheduled.</p>
      )}

      <div className="overflow-x-auto mt-4">
        {filteredDates.map((date) => (
          <div key={date} className="mb-10">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              {new Date(date).toDateString()}
            </h3>

            <table className="min-w-full text-sm table-auto border border-gray-300 dark:border-gray-700">
              <thead className="bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">#</th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Service</th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Time</th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Email</th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Additional Info</th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Meeting Link</th>
                  <th className="p-3 border border-gray-300 dark:border-gray-700 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetingsByDate[date].map((meeting, index) => (
                  <tr
                    key={meeting._id}
                    className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                  >
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{index + 1}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{meeting.service}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{meeting.time}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">{meeting.email}</td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {meeting.additionalInfo || "N/A"}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      {meeting.meetingLink ? (
                        <a
                          href={meeting.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 underline"
                        >
                          Join
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3 border border-gray-300 dark:border-gray-700">
                      <button
                        onClick={() => handleDelete(meeting._id)}
                        className="text-red-600 dark:text-red-400 hover:underline text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetingList;
