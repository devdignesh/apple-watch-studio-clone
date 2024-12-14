import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import cases from "@/data/cases";
import { setCase } from "@/store/slices/watchSlice";

const CaseSlider = () => {
  const dispatch = useDispatch();

  // Get the selected case image from the store
  const { currentCaseImage, currentBandImage, size } = useSelector(
    (state: any) => state.watch
  );

  // Flatten all case variations
  const allVariations = cases.flatMap(
    (caseCategory) => caseCategory.variations
  );
  console.log("allVariations:", allVariations);

  // Ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleCaseClick = (variation: any, mainCase: any) => {
    dispatch(
      setCase({
        subCase: variation,
        mainCase,
      })
    );

    // Center the active image in the slider
    const selectedElement = document.getElementById(`case-${variation.id}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  useEffect(() => {
    // On mount, center the selected case in the slider
    const selectedElement = allVariations.find(
      (variation) => variation.image === currentCaseImage
    );

    if (selectedElement && sliderRef.current) {
      const element = document.getElementById(`case-${selectedElement.id}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentCaseImage, allVariations]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1,delay:0.1, ease: "easeOut" }}
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
              {/* Show list of cases */}
              {allVariations.map((variation) => {
                const mainCase = cases.find((c) =>
                  c.variations.some((v) => v.id === variation.id)
                );
                return (
                  <div
                    id={`case-${variation.id}`}
                    className={`snap-center h-full inline-block whitespace-nowrap data-core-scroller-item `}
                    key={variation.id}
                  >
                    <button
                      className="snap-center whitespace-normal flex justify-center items-center m-0 p-0 w-[312px] h-full overflow-hidden bg-none relative text-center"
                      onClick={() => handleCaseClick(variation, mainCase)}
                    >
                      <Image
                        src={variation.image}
                        height={1000}
                        width={1000}
                        alt={variation.name}
                        className={`object-cover absolute w-[52vh] max-w-[500px]`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="absolute top-[-4px] z-0 h-auto max-w-[500px] w-[52vh] start-[50%] combinedimage m-auto">
          <Image
            src={currentBandImage}
            height={1000}
            width={1000}
            alt="watch band preview"
            className={`object-cover absolute w-[52vh] max-w-[500px] h-auto`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseSlider;
