"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BookCall from "./BookCall";
import BlurText from "@/components/ui/Animations/BannerAnimation";
import TrueFocus from "@/components/ui/Animations/TrueFocus";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const GetInTouch = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.3 });

  return (
    <section
      ref={containerRef}
      className=" min-h-screen relative z-10 flex flex-col justify-center items-center py-12 px-4 transition-colors duration-300"
    >


      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center  my-8 "
      >
        <TrueFocus
          sentence="Let's Talk"
          manualMode={false}
          blurAmount={3}
          borderColor="blue"
          animationDuration={2}
          pauseBetweenAnimations={1}
          className="text-medium p-2  text-violet-600 text-wrap md:text-xl  font-semibold text-center"
        />

        <div className="w-16 h-1 bg-indigo-500 mx-auto my-2 rounded-full" />
        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
          We’re just a message away. Let’s build something amazing together!
        </p>
      </motion.div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto relative  grid md:grid-cols-2 gap-8 items-start z-10">

        <BookCall />

        {/* Contact Info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className=" relative overflow-hidden"
        >
          <h3 className="text-xl text-gray-800 dark:text-gray-200 font-semibold mb-6">Contact Information</h3>

          <div className="flex items-start mb-6 gap-4">
            <div className="bg-indigo-100 dark:bg-white/20 p-2 rounded-full">
              <span className="text-xl">📞</span>
            </div>
            <div>
              <p className="font-semibold">Call Us</p>
              <p className="text-sm">+91 7899754028</p>
            </div>
          </div>

          <div className="flex items-start mb-6 gap-4">
            <div className="bg-indigo-100 dark:bg-white/20 p-2 rounded-full">
              <span className="text-xl">📧</span>
            </div>
            <div>
              <p className="font-semibold">Email Us</p>
              <p className="text-sm">business.samsarastudio@gmail.com</p>
            </div>
          </div>

          <div className="flex items-start mb-6 gap-4">
            <div className="bg-indigo-100 dark:bg-white/20 p-2 rounded-full">
              <span className="text-xl">📍</span>
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-sm max-w-[300px]"><span className="text-sm font-medium text-gray-700 dark:text-gray-100 hover:underline cursor-pointer">
               {` Branch Office: Whitefield, Bangalore, India`} <br />
                {`Branch Office: Dehradun, Uttarakhand, India`}
              </span></p>
            </div>
          </div>


        </motion.div>

      </div>
    </section>
  );
};

export default GetInTouch;
