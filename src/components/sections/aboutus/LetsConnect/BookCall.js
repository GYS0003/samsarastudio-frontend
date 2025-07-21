"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { verifyOTP, sendOTP, bookMeeting, fetchBooked, getTimeSlotsForDate } from "@/services/apis";
import GradientButton from "@/components/ui/GradientButton";

function BookCall() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const ref1 = useRef(null);
    const isInView1 = useInView(ref1, { once: true, margin: "-100px" });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [continueNext, setContinueNext] = useState(false);
    const [error, setError] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [unavailableTimes, setUnavailableTimes] = useState([]);
    const [service, setService] = useState("");
    const [additionalInfo, setAdditionalInfo] = useState("");
    const [meetingDetails, setMeetingDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    // Update fetchBookedTimes to set fetched slots from backend
    const fetchBookedTimes = async (date) => {
        try {
            const res = await getTimeSlotsForDate(date); // { date, slots: [{ time, isAvailable, isBlocked }] }
            if (res?.slots) {
                setUnavailableTimes(res.slots); // Set the whole slots array
            } else {
                setUnavailableTimes([]); // No slots found for the date
            }
        } catch (err) {
            console.error("Error fetching slots:", err);
        }
    };


    const handleSendOTP = async () => {
        try {
            setLoading(true);
            setOtpSent(true);
            if (!name || !email) {
                return setError("Name and Email are required");
            }
            await sendOTP(email, name);
            setError("");
            setLoading(false);
        } catch (err) {
            setError(err.message || "Failed to send OTP");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            setLoading(true);
            if (!otp) {
                return setError("OTP is required");
            }
            await verifyOTP(email, otp);
            setVerified(true);
            setContinueNext(false);
            setError("");
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err.message || "Invalid OTP");
        }
    };

    const handleBookMeeting = async () => {
        try {
            setLoading(true);
            if (!service || !selectedDate || !selectedTime) {
                return setError("Service, Date and Time are required");
            }

            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("name", name);
            formdata.append("service", service);
            formdata.append("date", selectedDate);
            formdata.append("time", selectedTime);
            formdata.append("additionalInfo", additionalInfo);
            if (file) {
                formdata.append("fileDoc", file);
            }

            const response = await bookMeeting(formdata); // Call API
            if (response.message === "Meeting booked") {
                setMeetingDetails({ ...response, name, email }); // include name/email for display
                setContinueNext(true);
            }
            setError("");
            setLoading(false);
            setTimeout(() => {
                window.location.href = "/";
            }, 7000);
        } catch (err) {
            setError(err.message || "Failed to book meeting");
            setLoading(false);
        }
    };


    return (
        <section
            ref={ref}
            className="min-h-screen relative z-10 flex flex-col justify-center items-center text-black dark:text-white px-4 py-14"
        >
            {!verified ? (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-xl"
                >
                    <h2 className="text-3xl font-bold text-center mb-2">Talk tech with us</h2>
                    <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-4">
                        Fill up your necessary details
                    </p>

                    {error && (
                        <p className="text-red-500 text-sm text-center mb-2">{error}</p>
                    )}

                    <form className="bg-gray-600 dark:bg-purple-900/90 p-6 rounded-xl text-white space-y-6">
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full p-3 rounded border border-gray-300 placeholder:text-gray-300 text-black dark:text-white dark:bg-transparent dark:border-purple-600"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <div className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your Email"
                                    className="w-full p-3 rounded-l border border-r-0 border-gray-300 placeholder:text-gray-300 text-black dark:text-white dark:bg-transparent dark:border-purple-600"
                                />
                                {!otpSent ? (<button
                                    type="button"
                                    onClick={handleSendOTP}
                                    className="px-3 bg-purple-600 text-white dark:text-black dark:hover:text-white font-semibold text-sm dark:bg-purple-100 rounded-r border border-gray-200 dark:border-purple-300 hover:bg-purple-700 transition"
                                >
                                    Get OTP
                                </button>) : (
                                    <p className="p-2   dark:text-black dark:hover:text-white font-semibold text-sm dark:bg-purple-100 rounded-r border border-gray-200 dark:border-purple-300 hover:bg-purple-700 transition bg-gray-400 text-black">OTP Sent</p>
                                )}
                            </div>
                        </div>

                        {otpSent && (
                            <div>
                                <label className="block text-sm mb-1">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter OTP"
                                    className="w-full p-3 rounded border border-gray-300 text-white placeholder:text-gray-300 dark:text-white dark:bg-transparent dark:border-purple-600"
                                />

                            </div>
                        )}
                    </form>

                    <div className="flex justify-between mt-6">
                        <GradientButton as='link' href="/aboutus"
                        // className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                        >
                            Back
                        </GradientButton>
                        {otpSent && (<GradientButton
                            as="button"
                            onClick={handleVerifyOTP}
                        // className="mt-3 w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-md hover:opacity-90 transition"
                        >
                            Verify OTP & Continue
                        </GradientButton>)}
                    </div>
                </motion.div>
            ) : !continueNext ? (
                <motion.div
                    ref={ref1}
                    className="dark:bg-[#3b0a63] bg-gray-600 text-white rounded-xl max-w-2xl w-full mx-auto p-4 md:pt-5 mt-4 shadow-lg"
                >
                    <h2 className="text-2xl font-semibold mb-6">New Meeting</h2>

                    <div className="mb-4">
                        <label className="block text-sm mb-1">Services you are interested in</label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                        >
                            <option value="" className="text-black">Select a service</option>
                            <option value="UI/UX Designer" className="text-black">UI/UX Designer</option>
                            <option value="Web Developer" className="text-black">Web Developer</option>
                            <option value="App Developer" className="text-black">App Developer</option>
                        </select>
                    </div>

                    <input
                        type="date"
                        value={selectedDate}
                        min={new Date().toISOString().split("T")[0]} // today's date (YYYY-MM-DD)
                        max={(() => {
                            const d = new Date();
                            d.setDate(d.getDate() + 6); // today + 6 = next 7 days including today
                            return d.toISOString().split("T")[0];
                        })()}
                        onChange={(e) => {
                            const date = e.target.value;
                            setSelectedDate(date);
                            if (date) {
                                fetchBookedTimes(date);
                            }
                        }}
                        className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                    />

                    <div className="my-4">
                        <label className="block text-sm mb-2">Available times</label>
                        <div className="flex flex-wrap gap-2">
                            {unavailableTimes.length === 0 ? (
                                <p className="text-sm text-gray-300">No slots found for this date</p>
                            ) : (
                                unavailableTimes.map((slot, idx) => {
                                    const isSelected = selectedTime === slot.time;
                                    const isDisabled = !slot.isAvailable || slot.isBlocked;

                                    return (
                                        <button
                                            key={idx}
                                            disabled={isDisabled}
                                            onClick={() => !isDisabled && setSelectedTime(slot.time)}
                                            className={`border border-white/30 rounded px-4 py-2 transition text-sm
                    ${isDisabled
                                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-purple-600 text-white font-bold"
                                                        : "text-white hover:bg-white/10"}
                `}
                                        >
                                            {slot.time}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm mb-1">Upload Document (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                        />

                    </div>

                    <div className="mb-6">
                        <label className="block text-sm mb-1">Additional Information</label>
                        <input
                            type="text"
                            placeholder="Additional Information"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                        />
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={() => setVerified(false)}
                            className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-2 rounded-md shadow-lg"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => handleBookMeeting(true)}
                            className="bg-gradient-to-r cursor-pointer from-pink-600 to-purple-600 text-white px-6 py-2 rounded-md shadow-lg"
                        >
                            {loading ? "Booking..." : "Continue"}
                        </button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-center items-center rounded-xl max-w-2xl w-full mx-auto shadow-lg bg-green-300 border-2 border-green-600 p-6 md:p-8 text-center"
                >
                    <h2 className="text-2xl md:text-3xl text-green-800 font-semibold mb-4">
                        New Meeting Booked
                    </h2>
                    <p className="text-gray-700 text-sm md:text-base mb-2">
                        Name: <span className="font-semibold">{meetingDetails.name}</span>
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mb-2">
                        Email: <span className="font-semibold">{meetingDetails.email}</span>
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mb-2">
                        Service: <span className="font-semibold">{meetingDetails.service}</span>
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mb-2">
                        Date: <span className="font-semibold">{meetingDetails.date}</span>
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mb-2">
                        Time: <span className="font-semibold">{meetingDetails.time}</span>
                    </p>
                    <p className="text-gray-700 text-sm md:text-base mb-4">
                        Additional Info: <span className="font-semibold">{meetingDetails.additionalInfo || "N/A"}</span>
                    </p>

                    <p className="text-green-900 text-sm md:text-base font-medium">
                        Please check your email for the meeting details.
                    </p>
                </motion.div>
            )}
        </section>
    );
}

export default BookCall;
