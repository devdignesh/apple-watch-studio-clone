import { watchCollections } from "@/data/watchCollections";
import { setSize } from "@/store/slices/watchSlice";
import { getImageSize } from "@/utils/imageSizes";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const SizeSlider = () => {
  const dispatch = useDispatch();

  const { currentBandImage, currentCaseImage, collection, size } =
    useSelector((state: any) => state.watch);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSizeClick = (option: {
    id: string;
    name: string;
    price: number;
  }) => {
    dispatch(setSize(option));

    // Center the active image in the slider
    const selectedElement = document.getElementById(`watch-${option.id}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  useEffect(() => {
    // On mount, center the selected band in the slider
    const selected = watchCollections
      .find((opt: any) => opt.id === collection)
      ?.sizes.find((s: any) => s.id === size.id);


    if (selected && sliderRef.current) {
      const element = document.getElementById(`watch-${selected.id}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [size, watchCollections]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
        className="relative"
      >
        <div
          className={`h-[53vh] max-h-[508px] min-h-[314px] overflow-y-hidden m-auto w-full relative z-10`}
        >
          <div
            className="overflow-y-hidden h-full whitespace-nowrap overflow-x-scroll pb-[20px] snap-none"
            ref={sliderRef}
          >
            <div
              className="max-h-[592px] h-full p-in-start overflow-x-scroll"
              style={{ overflowX: "scroll" }}
            >
              {watchCollections
                .find((opt: any) => opt.id === collection)
                ?.sizes.map((option: any) => {
                  const { width, height } = getImageSize(option.name);
                  
                  return (
                    <div
                      id={`watch-${option.id}`}
                      className={`snap-center h-full inline-block whitespace-nowrap data-core-scroller-item `}
                      key={option.id}>
                      <button
                        className="snap-center whitespace-normal flex justify-center items-end m-0 p-0  w-[312px] h-full overflow-hidden bg-none relative text-center"
                        onClick={() => handleSizeClick(option)}>
                        <Image
                          src={currentBandImage}
                          height={1000}
                          width={1000}
                          alt={option.name}
                          className={`object-cover absolute  w-[52vh] `}
                          style={{ maxWidth: `${width}px` }}
                        />
                        <Image
                          src={currentCaseImage}
                          height={1000}
                          width={1000}
                          alt={option.name}
                          className={`object-cover absolute w-[52vh] `}
                          style={{ maxWidth: `${width}px` }}
                        />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SizeSlider;
