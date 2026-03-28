import React from "react";
import { motion } from "framer-motion";

const TypingIndicator = ({ name }) => {
  return (
    <div className="flex items-end gap-2 mb-1">
      <div className="w-7 h-7 flex-shrink-0" />
      <div className="flex flex-col items-start">
        {name && (
          <p className="text-[10px] text-[#9ca3af] dark:text-gray-500 mb-1 ml-1">{name} is typing…</p>
        )}
        <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-md bg-white dark:bg-[#1e293b] border border-[#f1f5f9] dark:border-[#334155] shadow-sm">
          {[0, 0.18, 0.36].map((delay, i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-[#9ca3af] dark:bg-gray-500"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, delay, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;