import React from "react";
import { Link } from "react-router-dom";

const HeroBtn_idCard = () => {
  return (
    <div>
      <Link to="/IdCardForm">
        {/* <button className="group relative inline-flex items-center justify-center gap-3.5 px-8 py-4 w-full sm:w-auto bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] border border-[#E0D8D0] rounded-full cursor-pointer outline-none shadow-[0_2px_0_#D6CEC5,0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_0_#C8C0B8,0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-px active:shadow-[0_1px_0_#C8C0B8] transition-all duration-150">
          <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#FACC15] to-[#F59E0B] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-[10deg]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="4"
                width="16"
                height="12"
                rx="2.5"
                stroke="white"
                strokeWidth="1.6"
              />
              <circle cx="7" cy="9.5" r="2" stroke="white" strokeWidth="1.4" />
              <path
                d="M4.5 14c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12 8h3.5"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12 10.5h2.5"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12 13h2"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[15px] font-semibold text-white leading-none tracking-tight">
              Online ID Card Form
            </span>
            <span className="text-[11.5px] text-white leading-none">
              Fill details &amp; submit order
            </span>
          </div>

          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-1 text-[#C5B9B0] group-hover:text-[#F59E0B] group-hover:translate-x-1 transition-all duration-200"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button> */}

        <button className="group relative w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3.5 px-6 sm:px-8 py-4 border border-[#E0D8D0] bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] rounded-full cursor-pointer outline-none shadow-[0_2px_0_#D6CEC5,0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_0_#C8C0B8,0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-px active:shadow-[0_1px_0_#C8C0B8] transition-all duration-150">
          {/* Icon ring */}
          <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#FE6E4D] to-[#CC1267] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-[10deg]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect
                x="2"
                y="4"
                width="16"
                height="12"
                rx="2.5"
                stroke="white"
                strokeWidth="1.6"
              />
              <circle cx="7" cy="9.5" r="2" stroke="white" strokeWidth="1.4" />
              <path
                d="M4.5 14c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12 8h3.5"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12 10.5h2.5"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12 13h2"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Text */}
          <div className="flex flex-col items-center text-center poppins gap-1 flex-1">
            <span className="text-sm sm:text-base md:text-md font-semibold text-white leading-tight tracking-tight">
              Online ID Card Form
            </span>
            <span className="text-xs sm:text-sm text-white leading-tight">
              Fill details &amp; submit the form
            </span>
          </div>
          {/* Arrow */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="ml-1 text-[#C5B9B0] group-hover:text-[#ffffff] group-hover:translate-x-1 transition-all duration-200"
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

export default HeroBtn_idCard;
