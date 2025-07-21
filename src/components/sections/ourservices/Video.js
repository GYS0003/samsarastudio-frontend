       
       "use client";

       import React, { useRef, useState } from 'react';
       import { motion } from 'framer-motion';
       import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

       const Video = () => {
         const videoRef = useRef(null);
         const [isPlaying, setIsPlaying] = useState(false);
         const [isMuted, setIsMuted] = useState(false);
         const [showControls, setShowControls] = useState(false);

         const togglePlay = () => {
           if (videoRef.current) {
             if (isPlaying) {
               videoRef.current.pause();
             } else {
               videoRef.current.play().catch(console.error);
             }
             setIsPlaying(!isPlaying);
           }
         };

         const toggleMute = () => {
           if (videoRef.current) {
             const newMutedState = !isMuted;
             videoRef.current.muted = newMutedState;
             setIsMuted(newMutedState);
           }
         };

         return (
           <motion.section
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative py-16 px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto text-center"
           >
             <h2 className="text-3xl md:text-4xl font-bold mb-10 gradient-text-violet">
               Explore our marketing Services
             </h2>
             
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="relative z-10 w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl"
               onMouseEnter={() => setShowControls(true)}
               onMouseLeave={() => setShowControls(false)}
             >
             <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
               <video
                 ref={videoRef}
                 className="w-full h-full object-cover rounded-xl"
                 muted
                 playsInline
                 autoPlay
                 loop
                 onPlay={() => setIsPlaying(true)}
                 onPause={() => setIsPlaying(false)}
                 onLoadedData={() => {
                   if (videoRef.current) {
                     videoRef.current.play().catch(console.error);
                   }
                 }}
               >
                 <source src="/videos/samsaravideo.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>

               {/* Play/Pause Overlay */}
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: showControls || !isPlaying ? 1 : 0 }}
                 transition={{ duration: 0.3 }}
                 className="absolute inset-0 bg-black/20 flex items-center justify-center"
               >
                 <motion.button
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                   onClick={togglePlay}
                   className="bg-white bg-opacity-90 hover:bg-white text-black rounded-full p-3 sm:p-4 transition-all duration-300 shadow-lg"
                 >
                   {isPlaying ? (
                     <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                   ) : (
                     <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                   )}
                 </motion.button>
               </motion.div>

               {/* Controls Bar */}
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
                 transition={{ duration: 0.3 }}
                 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black from-opacity-80 to-transparent p-3 sm:p-4"
               >
                 <div className="flex items-center justify-between text-white">
                   <div className="flex items-center gap-3">
                     <button
                       onClick={togglePlay}
                       className="hover:scale-110 transition-transform"
                     >
                       {isPlaying ? (
                         <Pause className="w-5 h-5" />
                       ) : (
                         <Play className="w-5 h-5" />
                       )}
                     </button>
                     
                     <button
                       onClick={toggleMute}
                       className="hover:scale-110 transition-transform"
                     >
                       {isMuted ? (
                         <VolumeX className="w-5 h-5" />
                       ) : (
                         <Volume2 className="w-5 h-5" />
                       )}
                     </button>
                   </div>
                   
                   <span className="text-xs sm:text-sm font-medium hidden sm:block">Samsara Studio</span>
                 </div>
               </motion.div>
             </div>

             {/* Loading Animation */}
             <motion.div
               initial={{ opacity: 1 }}
               animate={{ opacity: 0 }}
               transition={{ delay: 1, duration: 0.5 }}
               className="absolute inset-0 bg-gray-900 flex items-center justify-center"
             >
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                 className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
               />
             </motion.div>
             </motion.div>
           </motion.section>
         );
       };

       export default Video;