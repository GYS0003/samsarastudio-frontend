"use client"

import React from 'react'
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import GradientButton from "@/components/ui/GradientButton";
import { verifyOTP, sendOTP, bookMeeting, fetchBooked, getTimeSlotsForDate } from "@/services/apis";

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const BookCall = () => {
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
    const [dateError, setDateError] = useState("");
    const [timeError, setTimeError] = useState("");

    const serviceOptions = [
        "Brand Marketing and Management",
        "SEO & SMO",
        "IT Support",
        "Business Consultation",
        "Influencer Marketing",
        "Content Creation"
    ];

    const fetchBookedTimes = async (date) => {
        try {
            const res = await getTimeSlotsForDate(date);
            if (res?.slots) {
                setUnavailableTimes(res.slots);
                const hasAvailableSlots = res.slots.some(slot => slot.isAvailable && !slot.isBlocked);
                if (!hasAvailableSlots) {
                    setDateError("No slots available for this date. Please select another date.");
                } else {
                    setDateError("");
                }
            } else {
                setUnavailableTimes([]);
                setDateError("No slots available for this date. Please select another date.");
            }
        } catch (err) {
            console.error("Error fetching slots:", err);
            setDateError("Failed to load time slots. Please try again.");
        }
    };

    const handleSendOTP = async () => {
        setError("");
        if (!name.trim()) {
            return setError("Please enter your name");
        }
        if (!email.trim()) {
            return setError("Please enter your email address");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError("Please enter a valid email address");
        }

        try {
            setLoading(true);
            await sendOTP(email, name);
            setOtpSent(true);
            setError("");
        } catch (err) {
            setError(err.message || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        setError("");
        if (!otp.trim()) {
            return setError("Please enter the OTP");
        }
        if (!/^\d{6}$/.test(otp)) {
            return setError("OTP must be 6 digits");
        }

        try {
            setLoading(true);
            await verifyOTP(email, otp);
            setVerified(true);
            setError("");
        } catch (err) {
            setError(err.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBookMeeting = async () => {
        setError("");
        setDateError("");
        setTimeError("");
        if (!service) {
            return setError("Please select a service");
        }
        if (!selectedDate) {
            return setDateError("Please select a date");
        }
        if (!selectedTime) {
            return setTimeError("Please select a time slot");
        }

        try {
            setLoading(true);
            const formdata = new FormData();
            formdata.append("email", email);
            formdata.append("name", name);
            formdata.append("service", service);
            formdata.append("date", selectedDate);
            formdata.append("time", selectedTime);
            formdata.append("additionalInfo", additionalInfo);
            
            if (file) {
                if (file.size > 10 * 1024 * 1024) {
                    return setError("File size exceeds 10MB limit");
                }
                formdata.append("fileDoc", file);
            }

            const response = await bookMeeting(formdata);
            if (response.message === "Meeting booked") {
                setMeetingDetails({ 
                    ...response, 
                    name, 
                    email,
                    service,
                    date: selectedDate,
                    time: selectedTime,
                    additionalInfo
                });
                setContinueNext(true);
            }
        } catch (err) {
            setError(err.message || "Failed to book meeting. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={ref} className='relative  flex justify-center items-center  z-10  py-30'>
            {!verified ? (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-xl"
                >
                    <motion.form
                        variants={fadeUp}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="bg-white dark:bg-gray-800/10 shadow-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl overflow-hidden p-5 space-y-5"
                    >
                        <h3 className="text-xl font-semibold mb-4">Book a Meeting</h3>
                        
                        <div>
                            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                           bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                           placeholder-gray-500 dark:placeholder-gray-400 
                                           focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Email</label>
                            <div className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email Address"
                                    className="flex-1 p-2 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l 
                                               bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                               placeholder-gray-500 dark:placeholder-gray-400 
                                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    disabled={otpSent || loading}
                                    className={`px-3 font-semibold text-sm rounded-r border border-l-0 transition
                                        ${otpSent 
                                            ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed border-gray-300 dark:border-gray-600" 
                                            : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 border-purple-600 dark:border-purple-700"}
                                    `}
                                >
                                    {otpSent ? "OTP Sent" : "Get OTP"}
                                </button>
                            </div>
                        </div>

                        {otpSent && (
                            <div>
                                <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                               bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                               placeholder-gray-500 dark:placeholder-gray-400 
                                               focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    maxLength={6}
                                />
                            </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-3">
                                <p className="text-red-700 dark:text-red-400 text-center">{error}</p>
                            </div>
                        )}
                        
                        <div className="flex justify-center mt-6">
                            {otpSent && (
                                <GradientButton
                                    as="button"
                                    onClick={handleVerifyOTP}
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Verify OTP & Continue"}
                                </GradientButton>
                            )}
                        </div>
                    </motion.form>
                </motion.div>
            ) : !continueNext ? (
                <motion.div
                    ref={ref1}
                    className="bg-white dark:bg-gray-800/30 shadow-2xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-5 space-y-5"
                >
                    <h2 className="text-2xl font-semibold mb-6">New Meeting</h2>

                    <div className="mb-4">
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Services you are interested in</label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                       bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                       focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="" className="text-gray-500 dark:text-gray-400">Select a service</option>
                            {serviceOptions.map((service, index) => (
                                <option 
                                    key={index} 
                                    value={service}
                                    className="text-gray-800 dark:text-gray-200"
                                >
                                    {service}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split("T")[0]}
                            max={(() => {
                                const d = new Date();
                                d.setDate(d.getDate() + 30);
                                return d.toISOString().split("T")[0];
                            })()}
                            onChange={(e) => {
                                const date = e.target.value;
                                setSelectedDate(date);
                                setSelectedTime("");
                                setDateError("");
                                if (date) fetchBookedTimes(date);
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                       bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                       focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Available times</label>
                        {dateError ? (
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 rounded-lg p-3">
                                <p className="text-yellow-700 dark:text-yellow-400">{dateError}</p>
                            </div>
                        ) : !selectedDate ? (
                            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-400 dark:border-blue-700 rounded-lg p-3">
                                <p className="text-blue-700 dark:text-blue-400">Please select a date to see available time slots</p>
                            </div>
                        ) : unavailableTimes.length === 0 ? (
                            <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 rounded-lg p-3">
                                <p className="text-yellow-700 dark:text-yellow-400">Loading time slots...</p>
                            </div>
                        ) : (
                            <div className="flex max-w-[350px] flex-wrap gap-2">
                                {unavailableTimes.map((slot, idx) => {
                                    const isSelected = selectedTime === slot.time;
                                    const isDisabled = !slot.isAvailable || slot.isBlocked;

                                    return (
                                        <button
                                            key={idx}
                                            type="button"
                                            disabled={isDisabled}
                                            onClick={() => {
                                                setSelectedTime(slot.time);
                                                setTimeError("");
                                            }}
                                            className={`p-2 rounded text-sm transition
                                                ${isDisabled
                                                    ? "bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-purple-600 text-white font-bold"
                                                        : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"}
                                            `}
                                        >
                                            {slot.time}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Upload Document (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                       bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                       file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 
                                       file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-gray-700 
                                       file:text-purple-700 dark:file:text-purple-300"
                        />
                        <p className="text-xs text-gray-600 dark:text-gray-400 max-w-[300px] mt-2">
                            Note: Only upload documents stored locally on your device. Files from cloud services are not supported. Max file size: 10MB.
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">Additional Information</label>
                        <textarea
                            placeholder="Tell us about your project or specific requirements"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                                       bg-white dark:bg-gray-900 text-gray-800 dark:text-white 
                                       focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={3}
                        />
                    </div>
                    
                    {(error || dateError || timeError) && (
                        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-lg p-3">
                            {error && <p className="text-red-700 dark:text-red-400">{error}</p>}
                            {dateError && <p className="text-red-700 dark:text-red-400">{dateError}</p>}
                            {timeError && <p className="text-red-700 dark:text-red-400">{timeError}</p>}
                        </div>
                    )}

                    <div className="flex justify-end mt-6">
                        <GradientButton
                            onClick={handleBookMeeting}
                            disabled={loading}
                        >
                            {loading ? "Booking..." : "Schedule Meeting"}
                        </GradientButton>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView1 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="bg-white dark:bg-gray-800 shadow-2xl border border-green-500/50 dark:border-gray-700 rounded-xl p-5 space-y-5"
                >
                    <div className="text-center mb-6">
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-gray-900 dark:text-white">
                            Meeting Scheduled Successfully!
                        </h2>
                        <p className="text-green-500 dark:text-green-400 mt-2">
                            {`We've sent the details to your email`}
                        </p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                                <p className="font-medium text-gray-900 dark:text-white">{meetingDetails.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                                <p className="font-medium text-gray-900 dark:text-white">{meetingDetails.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Service</p>
                                <p className="font-medium text-gray-900 dark:text-white">{meetingDetails.service}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Meeting Link</p>
                                <p className="font-medium text-gray-900 dark:text-white">{meetingDetails.meetingLink}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Date & Time</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {meetingDetails.date} at {meetingDetails.time}
                                </p>
                            </div>
                            {meetingDetails.additionalInfo && (
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Additional Info</p>
                                    <p className="text-gray-900 dark:text-white">{meetingDetails.additionalInfo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Check your email for calendar invite and meeting details
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default BookCall