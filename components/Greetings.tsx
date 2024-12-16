import { setIsGreeting } from "@/store/slices/uiSlice";
import React from "react";
import { useDispatch } from "react-redux";

const Greetings = () => {
  const dispatch = useDispatch();

  return (
    <div className="absolute top-[17%] w-full z-10">
      <div className="m-auto max-w-[45rem] px-4 sm:px-6 lg:px-0">
        <span className="text-[18px] sm:text-[22px] pb-[8px] sm:pb-[10px] block font-proDisplayRegular">
          Apple Watch Studio
        </span>

        <div className="flex flex-col text-[40px] sm:text-[48px] md:text-[64px] leading-[44px] sm:leading-[54px] md:leading-[68px] font-proDisplaySemibold">
          <span>Choose a case.</span>
          <span>Pick a band.</span>
          <span>Create your own style.</span>
        </div>

        <div>
          <button
            onClick={() => dispatch(setIsGreeting(false))}
            className="bg-[#0071e3] px-4 sm:px-6 py-2 rounded-full text-white mt-[32px] sm:mt-[43px] font-proDisplayRegular text-[14px] sm:text-[18px]"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
