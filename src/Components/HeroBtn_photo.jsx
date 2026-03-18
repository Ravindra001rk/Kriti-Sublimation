import React from "react";
import { Link } from "react-router-dom";

const HeroBtn = () => {
  return (
    <div>
      <Link to="/gallery">
        <button className="group relative w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3.5 px-6 sm:px-8 py-4 border border-[#E0D8D0] rounded-full cursor-pointer outline-none shadow-[0_2px_0_#D6CEC5,0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_0_#C8C0B8,0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-px active:shadow-[0_1px_0_#C8C0B8] transition-all duration-150">
          {/* Icon ring */}
          <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-[10deg]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="4.5"
                width="16"
                height="12"
                rx="2.5"
                stroke="white"
                strokeWidth="1.6"
              />
              <circle
                cx="10"
                cy="10.5"
                r="2.8"
                stroke="white"
                strokeWidth="1.5"
              />
              <circle cx="10" cy="10.5" r="1" fill="white" />
              <path
                d="M7.5 4.5V3.8C7.5 3.3 7.9 3 8.4 3h3.2c.5 0 .9.3.9.8v.7"
                stroke="white"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle cx="15.2" cy="6.8" r="0.7" fill="white" />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center text-center poppins gap-1 flex-1">
            <span className="text-sm sm:text-base md:text-md font-semibold text-[#1A1410] leading-tight tracking-tight">
              View My Photo
            </span>
            <span className="text-xs sm:text-sm text-[#9E9189] leading-tight">
              Enter your phone number
            </span>
          </div>
          {/* Arrow */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-1 text-[#C5B9B0] group-hover:text-[#E8420D] group-hover:translate-x-1 transition-all duration-200"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
};

export default HeroBtn;
