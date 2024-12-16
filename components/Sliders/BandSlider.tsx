import bands from "@/data/bands";
import { setBand, setCase } from "@/store/slices/watchSlice";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const BandSlider = () => {
  const dispatch = useDispatch();

  // Get the selected case image from the store
 
   const { currentCaseImage, currentBandImage, size,collection } = useSelector(
      (state: any) => state.watch
    );

  const collectionBands = bands.find(
    (col) => col.collectionId === collection
  );

  // Flatten all band variations
  const allVariations = collectionBands?.band.flatMap(
    (bandCategory) => bandCategory.variations
  );

  // Ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleBandClick = (variation: any, mainBand: any) => {
    dispatch(
      setBand({
        subBand: variation,
        mainBand,
      })
    );

    // Center the active image in the slider
    const selectedElement = document.getElementById(`band-${variation.id}`);
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
    const selectedElement = allVariations?.find(
      (variation) => variation.image === currentBandImage
    );

    if (selectedElement && sliderRef.current) {
      const element = document.getElementById(`band-${selectedElement.id}`);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [currentBandImage, allVariations]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 1, delay:0.1,  ease: "easeOut" }}
        className="relative"
      >
        <div
          className={`h-[53vh] max-h-[508px] min-h-[314px] overflow-y-hidden m-auto w-full relative z-0`}
        >
          <div
            className="overflow-y-hidden h-full whitespace-nowrap overflow-x-scroll pb-[20px] snap-none"
            ref={sliderRef}
          >
            <div
              className="max-h-[592px] h-full p-in-start overflow-x-scroll"
              style={{ overflowX: "scroll" }}
            >
              {/* Shows list of bands */}
              {allVariations?.map((variation) => {
                const mainBand = collectionBands?.band.find((b) =>
                  b.variations.some((v) => v.id === variation.id)
                );
                return (
                  <div
                    id={`band-${variation.id}`}
                    className={`snap-center h-full inline-block whitespace-nowrap data-core-scroller-item `}
                    key={variation.id}
                  >
                    <button
                      className="snap-center whitespace-normal flex justify-center items-center m-0 p-0 w-[35vh] md:w-[312px] h-full overflow-hidden bg-none relative text-center"
                      onClick={() => handleBandClick(variation, mainBand)}
                    >
                      <Image
                        src={variation.image}
                        height={1000}
                        width={1000}
                        alt={variation.name}
                        className="object-cover absolute w-[52vh] max-w-[500px]"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="absolute top-[-4px] z-10 h-auto max-w-[500px] w-[52vh] start-[50%] combinedimage m-auto">
          <Image
            src={currentCaseImage}
            height={1000}
            width={1000}
            alt="watch band preview"
            className="object-cover absolute w-[52vh] max-w-[500px] h-auto "
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BandSlider;
