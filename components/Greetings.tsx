import React from "react";

interface GreetingProps {
  setIsGreeting: React.Dispatch<React.SetStateAction<boolean>>;
}

const Greetings: React.FC<GreetingProps> = ({ setIsGreeting }) => {
  return (
    <div className="absolute top-[17%] w-full z-10 ">
      <div className="m-auto max-w-[45rem] ">
        <span className="text-[22px] pb-[10px] block font-proDisplayRegular">
          Apple Watch Studio
        </span>

        <div className="flex flex-col text-[64px] leading-[68px]  font-proDisplaySemibold">
          <span>Choose a case.</span>
          <span>Pick a band.</span>
          <span>Create your own style.</span>
        </div>

        <div>
          <button
            onClick={() => setIsGreeting(false)}
            className="bg-[#0071e3] px-6 py-2 rounded-full text-white mt-[43px] font-proDisplayRegular text-[18px] "
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Greetings;
