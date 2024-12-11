import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <div className="p-9">
        <Image
          src={"/images/apple-watch-design-studio-logo.jpg"}
          height={28}
          width={100}
          className=""
          alt="apple-watch-logo"
        />
      </div>
      <div className="flex flex-col max-w-3xl mx-auto mt-16">
        <span className="text-xl pb-4 font-proDisplayRegular">
          Apple Watch Studio
        </span>

        <div className="flex flex-col text-6xl  font-proDisplaySemibold space-y-2">
          <span>Choose a case.</span>
          <span>Pick a band.</span>
          <span>Create your own style.</span>
        </div>

        <div>
          <button className="bg-[#0076df] px-5 py-2 rounded-full text-white mt-8 font-proDisplayRegular text-lg ">
            Get started
          </button>
        </div>

        <div className="relative">
          <Image
            src={"/images/bands/solo_black.jpg"}
            height={1000}
            width={1000}
            alt="default band preview"
            className="  object-cover absolute top-0 bottom-0 "
          />
          
          <Image
            src={"/images/cases/aluminum_black.png"}
            height={1000}
            width={1000}
            alt="default case preview"
            className="  object-cover absolute "
          />
        </div>
      </div>
    </>
  );
};

export default page;
