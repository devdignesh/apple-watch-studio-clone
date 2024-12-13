import { WatchSizeIcon } from "@/assets/WatchSizeIcon";
import React, { useState } from "react";
import { setSize } from "@/store/slices/watchSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleButton } from "@/store/slices/buttonSlice";
import { motion } from "framer-motion";

const Footer = () => {
  const dispatch = useDispatch();
  const { collection, size, options, selectedCase, selectedBand, totalPrice } =
    useSelector((state: any) => state.watch);
  const openButton = useSelector((state: any) => state.button.openButton);

  return (
    <footer className="bottom-[40px] box-border mt-[72px]  overflow-hidden py-[24px]  text-center whitespace-nowrap w-full">
      <div className="min-h-[35px]  overflow-x-scroll pb-[5px] flex justify-center w-full">
        <div className="bg-[#e8e8ed] space-x-2 rounded-full  items-center flex  text-[#1d1d1f] border-none  mx-[6px] px-[18px] font-proTextRegular font-[17px] tracking-[-.022em] ">
          <div className="inline-block">
            <WatchSizeIcon />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="space-x-3 ">
            {openButton === "Size" ? (
              options
                .find((opt: any) => opt.name === collection)
                ?.sizes.map((option: any) => (
                  <button
                    key={option.name}
                    onClick={() => dispatch(setSize(option))}
                    className={`my-[5px] min-h-[20px]  text-[17px] align-middle text-[#1d1d1f] py-[5px] ${
                      size.name === option.name
                        ? "font-proTextSemibold"
                        : "font-proTextRegular"
                    }`}
                  >
                    {option.name}
                  </button>
                ))
            ) : (
              <button
                onClick={() => dispatch(toggleButton("Size"))}
                className="my-[5px] min-h-[20px]  font-proTextRegular text-[17px]  align-middle text-[#1d1d1f]  py-[5px]"
              >
                Size
              </button>
            )}
          </motion.div>
        </div>

        <div className="bg-[#e8e8ed] space-x-2 rounded-full  items-center flex  text-[#1d1d1f] border-none  mx-[6px] px-[18px] font-proTextRegular font-[17px] tracking-[-.022em] ">
          <div className="inline-block">
            <WatchSizeIcon />
          </div>
          {openButton === "Case" ? (
            <></>
          ) : (
            <button
              onClick={() => dispatch(toggleButton("Case"))}
              className="my-[5px] min-h-[20px]  font-proTextRegular text-[17px]  align-middle text-[#1d1d1f]  py-[6px]"
            >
              Case
            </button>
          )}
        </div>
        <div className="bg-[#e8e8ed] space-x-2 rounded-full  items-center flex  text-[#1d1d1f] border-none  mx-[6px] px-[18px] font-proTextRegular font-[17px] tracking-[-.022em] ">
          <div className="inline-block">
            <WatchSizeIcon />
          </div>
          {openButton === "Band" ? (
            <></>
          ) : (
            <button
              onClick={() => dispatch(toggleButton("Band"))}
              className="my-[5px] min-h-[20px]  font-proTextRegular text-[17px]  align-middle text-[#1d1d1f]  py-[6px]"
            >
              Band
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
