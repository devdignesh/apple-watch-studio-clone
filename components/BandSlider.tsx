import bands from "@/data/bands";
import { setBand, setCase } from "@/store/slices/watchSlice";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const BandSlider = () => {
  const dispatch = useDispatch(); //

  // Get the selected case image from the store
  const caseImage = useSelector((state: any) => state.watch.currentCaseImage); //
  const bandImage = useSelector((state: any) => state.watch.currentBandImage);


  // Flatten all band variations
  const allVariations = bands.flatMap(
    //
    (bandCategory) => bandCategory.variations //
  );
  console.log("allVariations:", allVariations); //

  // Ref for the slider container
  const sliderRef = useRef<HTMLDivElement>(null); //

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
    const selectedElement = allVariations.find(
      (variation) => variation.image === bandImage
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
  }, [bandImage, allVariations]);

  return (
    <div className="relative">
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
            {/* Show list of cases */}
            {allVariations.map((variation) => {
              const mainBand = bands.find((b) =>
                b.variations.some((v) => v.id === variation.id)
              );
              return (
                <div
                  id={`band-${variation.id}`}
                  className={`snap-center h-full inline-block whitespace-nowrap data-core-scroller-item `}
                  key={variation.id}
                >
                  <button
                    className="snap-center whitespace-normal flex justify-center items-center m-0 p-0 w-[312px] h-full overflow-hidden bg-none relative text-center"
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
          src={caseImage}
          height={1000}
          width={1000}
          alt="watch band preview"
          className="object-cover absolute w-[52vh] max-w-[500px] h-auto "
        />
      </div>
    </div>
  );
};

export default BandSlider;
