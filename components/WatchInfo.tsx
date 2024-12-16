import React from "react";
import { useSelector } from "react-redux";

const WatchInfo = () => {
  const { collection, size, selectedCase, selectedBand, totalPrice } =
    useSelector((state: any) => state.watch);

  return (
    <div className="flex flex-col">
      <span className="text-[#6e6e73] font-proTextSemibold tracking-[-.01em] mb-[4px] text-xs">
        {collection}
      </span>
      <span className="text-[#1d1d1f] font-proTextSemibold  tracking-[-.016em] mb-[5px] overflow-hidden text-sm">
        {`${size.name} ${selectedCase.name} with ${selectedBand.name}`}
      </span>
      <span className="text-[#1d1d1f] font-semibold mb-[5px] tracking-[-.016em] overflow-hidden text-sm">
        {`From $${totalPrice}`}
      </span>
    </div>
  );
};

export default WatchInfo;
