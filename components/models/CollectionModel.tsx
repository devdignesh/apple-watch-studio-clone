import { watchCollections } from "@/data/watchCollections";
import { resetButton } from "@/store/slices/buttonSlice";
import { setIsCollectionModel } from "@/store/slices/uiSlice";
import { setCollection } from "@/store/slices/watchSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const CollectionModel = () => {
  const dispatch = useDispatch();

  const { collection } = useSelector((state: any) => state.watch);

  // Handle collection click with set collection, set model close and reset ui in store
  const handleCollectionClick = (item: any) => {
    dispatch(setCollection(item.id));
    dispatch(setIsCollectionModel(false));
    dispatch(resetButton());
  };

  return (
    <div
      className="m-0 p-0 bg-[#32323270] fixed inset-0  flex items-start justify-center z-50"
      onClick={() => dispatch(setIsCollectionModel(false))}
    >
      <div
        className="rounded-[24px] flex-grow-0  min-h-0  min-w-[320px] top-[62px] bg-[#0000] mx-w-[816px] p-0"
        onClick={(e) => e.stopPropagation()}>
        <div className="rounded-[18px]  min-h-0 bg-[#fff] flex flex-col  mt-[62px]">
          <div className="p-0 mt-0 overflow-hidden">
            <ul className="px-[26px] list-none ms-0">
              {watchCollections.map((item) => {
                return (
                  <li
                    onClick={() => handleCollectionClick(item)}
                    key={item.id}
                    className="border-b-[1px] last:border-b-0 w-full border-solid text-center border-[#d2d2d7] pt-[18px] pb-[17px] "
                  >
                    <span
                      className={` cursor-pointer w-full font-proTextRegular text-[17px] tracking-tight leading-[1.470] text-center ${
                        item.id === collection
                          ? "text-[#86868b]"
                          : "text-[#1d1d1f]"
                      } `}
                    >
                      {item.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModel;
