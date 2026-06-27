import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ message = "Loading....." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full bg-[#F8FAFC] p-8">
      {/* Container for the Animated Book */}
      <div className="relative w-16 h-12 flex items-center justify-center mb-6">
        
        {/* AI Aura Effect (Subtle Emerald/Blue Pulse in Background) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-[#10B981]/10 rounded-full blur-xl animate-pulse scale-150" />

        {/* The Book Structure */}
        <div className="relative w-12 h-10 border-2 border-[#1E293B] rounded-sm flex justify-between bg-white px-0.5 shadow-sm">
          {/* Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#1E293B] -translate-x-1/2 z-20" />
          
          {/* Static Left Page Lines */}
          <div className="w-1/2 pr-1 pt-1.5 flex flex-col gap-1 opacity-40">
            <div className="h-[2px] w-full bg-[#1E293B]" />
            <div className="h-[2px] w-3/4 bg-[#1E293B]" />
            <div className="h-[2px] w-5/6 bg-[#1E293B]" />
          </div>

          {/* Static Right Page Lines */}
          <div className="w-1/2 pl-1 pt-1.5 flex flex-col gap-1 opacity-40">
            <div className="h-[2px] w-full bg-[#1E293B]" />
            <div className="h-[2px] w-5/6 bg-[#1E293B]" />
            <div className="h-[2px] w-2/3 bg-[#1E293B]" />
          </div>

          {/* Flipping Page (Custom CSS Animation) */}
          <div 
            className="absolute top-0 right-1/2 w-[22px] h-full bg-white border-l border-t border-b border-[#1E293B] origin-right z-10 pr-0.5 pt-1.5 flex flex-col gap-1"
            style={{
              animation: 'flipPage 1.6s infinite ease-in-out',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="h-[2px] w-full bg-[#1E293B] opacity-60" />
            <div className="h-[2px] w-4/5 bg-[#1E293B] opacity-60" />
            <div className="h-[2px] w-3/4 bg-[#1E293B] opacity-60" />
          </div>
        </div>
      </div>

      {/* Loading Text & Status indicator */}
      <div className="flex flex-col items-center gap-2 max-w-xs text-center">
        <motion.p 
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-sm font-medium text-[#1E293B] tracking-wide"
        >
          {message}
        </motion.p>
        
        {/* Subtle Progress Track */}
        <div className="w-32 h-[3px] bg-[#2563EB]/10 rounded-full overflow-hidden mt-1">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#4F46E5]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Global CSS Injector for the 3D flipping page */}
      <style>{`
        @keyframes flipPage {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(-180deg);
          }
          100% {
            transform: rotateY(-180deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;