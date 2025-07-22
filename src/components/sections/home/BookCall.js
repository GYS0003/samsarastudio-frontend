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
        // Clear previous errors
        setError("");
        
        // Validate inputs
        if (!name.trim()) {
            return setError("Please enter your name");
        }
        
        if (!email.trim()) {
            return setError("Please enter your email address");
        }
        
        // Basic email validation
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
        // Clear previous errors
        setError("");
        
        if (!otp.trim()) {
            return setError("Please enter the OTP");
        }
        
        // Basic OTP validation (6 digits)
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
        // Clear previous errors
        setError("");
        setDateError("");
        setTimeError("");
        
        // Validate service selection
        if (!service) {
            return setError("Please select a service");
        }
        
        // Validate date selection
        if (!selectedDate) {
            return setDateError("Please select a date");
        }
        
        // Validate time selection
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
                // Check file size (max 10MB)
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
        <div ref={ref} className='relative z-10 max-w-2xl mx-auto'>
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
                        className="bg-white dark:bg-white/10 backdrop-blur-md shadow-2xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-xl  overflow-hidden p-5 space-y-5"
                    >
                        
                        <h3 className="text-xl font-semibold mb-4">Book a Meeting</h3>
                        
                        <div>
                            <label className="block text-sm mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                className="p-2 border border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Email</label>
                            <div className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Email Address"
                                    className="flex-1 p-2 border border-gray-400 dark:border-gray-600 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    type="button"
                                    onClick={handleSendOTP}
                                    disabled={otpSent || loading}
                                    className={`px-3 font-semibold text-sm rounded-r border transition
                                        ${otpSent 
                                            ? "bg-gray-400 text-gray-700 dark:bg-gray-600 dark:text-gray-300 cursor-not-allowed" 
                                            : "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"}
                                    `}
                                >
                                    {otpSent ? "OTP Sent" : "Get OTP"}
                                </button>
                            </div>
                        </div>

                        {otpSent && (
                            <div>
                                <label className="block text-sm mb-1">OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full p-3 rounded border border-gray-300 text-white placeholder:text-gray-300 dark:text-white dark:bg-transparent dark:border-purple-600"
                                    maxLength={6}
                                />
                            </div>
                        )}
                          {error && (
                        <div className="bg-red-500/20 border border-red-500 rounded-lg p-2 my-2">
                            <p className="text-red-500 text-center">{error}</p>
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
                    className="bg-white dark:bg-white/10 backdrop-blur-md shadow-2xl border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-xl relative overflow-hidden p-5 space-y-5"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3" />
                    <h2 className="text-2xl font-semibold mb-6">New Meeting</h2>

                 
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Services you are interested in</label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                        >
                            <option value="" className="text-black dark:text-gray-400">Select a service</option>
                            {serviceOptions.map((service, index) => (
                                <option 
                                    key={index} 
                                    value={service}
                                    className="text-black dark:text-gray-400"
                                >
                                    {service}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm mb-1">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            min={new Date().toISOString().split("T")[0]}
                            max={(() => {
                                const d = new Date();
                                d.setDate(d.getDate() + 30); // Extend to 30 days
                                return d.toISOString().split("T")[0];
                            })()}
                            onChange={(e) => {
                                const date = e.target.value;
                                setSelectedDate(date);
                                setSelectedTime(""); // Reset time selection
                                setDateError("");
                                if (date) {
                                    fetchBookedTimes(date);
                                }
                            }}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm mb-2">Available times</label>
                        {dateError ? (
                            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3">
                                <p className="text-yellow-500">{dateError}</p>
                            </div>
                        ) : !selectedDate ? (
                            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-3">
                                <p className="text-blue-500">Please select a date to see available time slots</p>
                            </div>
                        ) : unavailableTimes.length === 0 ? (
                            <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-3">
                                <p className="text-yellow-500">Loading time slots...</p>
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
                                            className={`border border-white/30 rounded px-4 py-2 transition text-sm
                                                ${isDisabled
                                                    ? "bg-gray-500/30 text-gray-400 cursor-not-allowed"
                                                    : isSelected
                                                        ? "bg-purple-600 text-white font-bold"
                                                        : "text-white hover:bg-white/10"}
                                            `}
                                        >
                                            {slot.time}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="mb-4 flex flex-col items-start justify-between">
                        <label className="block text-sm mb-1">Upload Document (optional)</label>
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                        />
                        <p className="max-w-[350px] text-xs text-white/70 mt-2">
                            <em className="not-italic text-white/70">
                                Note: Only upload documents stored locally on your device. Files from cloud services (e.g., Google Drive, iCloud) are not supported. The maximum allowed file size is <strong className="text-white">10MB</strong>.
                            </em>
                        </p>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm mb-1">Additional Information</label>
                        <textarea
                            placeholder="Tell us about your project or specific requirements"
                            value={additionalInfo}
                            onChange={(e) => setAdditionalInfo(e.target.value)}
                            className="w-full bg-transparent border border-white/30 rounded px-4 py-2 text-white"
                            rows={3}
                        />
                    </div>
                    {(error || dateError || timeError) && (
                        <div className="bg-red-500/20 border text-sm border-red-500 rounded-lg p-2 my-2">
                            {error && <p className="text-red-500">{error}</p>}
                            {dateError && <p className="text-red-500">{dateError}</p>}
                            {timeError && <p className="text-red-500">{timeError}</p>}
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
                    className="bg-white z-10 dark:bg-white/10 backdrop-blur-md shadow-2xl border border-green-500/30 dark:border-white/20 rounded-xl relative overflow-hidden p-5 space-y-5"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3" />
                    
                    <div className="text-center mb-6">
                        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h2 className="text-2xl md:text-3xl text-white font-semibold mt-4">
                            Meeting Scheduled Successfully!
                        </h2>
                        <p className="text-green-400 mt-2">{`We've sent the details to your email`}</p>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                        <div className="grid grid-cols-1  gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">Name</p>
                                <p className="text-white font-medium">{meetingDetails.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Email</p>
                                <p className="text-white font-medium">{meetingDetails.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Service</p>
                                <p className="text-white font-medium">{meetingDetails.service}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Meeting Link</p>
                                <p className="text-white font-medium">{meetingDetails.meetingLink}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Date & Time</p>
                                <p className="text-white font-medium">
                                    {meetingDetails.date} at {meetingDetails.time}
                                </p>
                            </div>
                            {meetingDetails.additionalInfo && (
                                <div className="md:col-span-2">
                                    <p className="text-gray-400 text-sm">Additional Info</p>
                                    <p className="text-white">{meetingDetails.additionalInfo}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-6 text-center">
                     
                        <p className="text-white/70 mt-4">
                            Check your email for calendar invite and meeting details
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default BookCall