import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import CaseSlider from "./CaseSlider";

interface GreetingProps {
  setIsGreeting: React.Dispatch<React.SetStateAction<boolean>>;
  isGreeting: boolean;
}

const Greeting: React.FC<GreetingProps> = ({ setIsGreeting, isGreeting }) => {
  const caseImage = useSelector((state: any) => state.watch.currentCaseImage);
  const bandImage = useSelector((state: any) => state.watch.currentBandImage);

  const sideViewImage = useSelector(
    (state: any) => state.watch.currentSideViewImage
  );

  const { collection, size, options, selectedCase, selectedBand, totalPrice } =
    useSelector((state: any) => state.watch);

  const [sideview, setSideView] = useState(false);
  const openButton = useSelector((state: any) => state.button.openButton);

  const dispatch = useDispatch();

  

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className=""
      >
        {isGreeting && (
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
        )}

        <div className="text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: "28rem",
              scale: 2,
              top: "15vh",
            }}
            animate={{
              opacity: 1,
              y: isGreeting ? "28rem" : 0,
              scale: isGreeting ? 2 : 1,
              top: isGreeting ? "15vh" : "4vh",
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.4,
            }}
            className="relative"
          >
            {openButton === "Case" && <CaseSlider />}

            {openButton === null && (
              <div
                className={`h-[53vh] max-h-[29.88rem] min-h-[18.47rem] m-auto max-w-[500px] w-[52vh] relative`}
              >
                {!sideview && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.7,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={bandImage}
                        height={1000}
                        width={1000}
                        alt="watch band preview"
                        className="object-cover absolute w-[52vh] max-w-[500px] "
                      />
                      <Image
                        src={caseImage}
                        height={1000}
                        width={1000}
                        alt="watch case preview"
                        className="object-cover  absolute w-[52vh] max-w-[500px]  "
                      />
                    </motion.div>
                  </>
                )}

                {sideview && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.7,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={sideViewImage}
                      height={1000}
                      width={1000}
                      alt="watch side preview"
                      className="object-cover  absolute w-[52vh] max-w-[500px]  "
                    />
                  </motion.div>
                )}

              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {!isGreeting && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
            className="m-auto flex flex-col pt-[6vh] text-center w-[60%] font-proTextRegular text-sm   leading-[1.42]"
          >
            <button
              onClick={() => setSideView(!sideview)}
              className="mb-3 text-[#06c] underline text-xs"
            >
              {sideview ? "Front view" : "Side view"}
            </button>
            <div className="flex flex-col">
              <span className="text-[#6e6e73] font-proTextSemibold tracking-[-.01em] mb-[4px] text-xs">
                {collection}
              </span>
              <span className="text-[#1d1d1f] font-proTextSemibold  tracking-[-.016em] mb-[5px] overflow-hidden text-sm">
                {`${size.name} ${selectedCase.name} Case with ${selectedBand.name}`}
              </span>
              <span className="text-[#1d1d1f] font-semibold mb-[5px] tracking-[-.016em] overflow-hidden text-sm">
                {`From $${totalPrice}`}
              </span>
            </div>

            <Footer />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Greeting;
