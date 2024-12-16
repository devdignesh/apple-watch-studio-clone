import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import CaseSlider from "./Sliders/CaseSlider";
import BandSlider from "./Sliders/BandSlider";
import SizeSlider from "./Sliders/SizeSlider";
import WatchInfo from "./WatchInfo";
import Greetings from "./Greetings";
import CollectionModel from "./models/CollectionModel";

interface GreetingProps {
  setIsGreeting: React.Dispatch<React.SetStateAction<boolean>>;
  isGreeting: boolean;
  isCollectionModel : boolean;
  setIsCollectionModel:  React.Dispatch<React.SetStateAction<boolean>>;
}

const Studio: React.FC<GreetingProps> = ({ setIsGreeting, isGreeting,isCollectionModel,setIsCollectionModel }) => {
  const caseImage = useSelector((state: any) => state.watch.currentCaseImage);
  const bandImage = useSelector((state: any) => state.watch.currentBandImage);

  const sideViewImage = useSelector(
    (state: any) => state.watch.currentSideViewImage
  );

  const [sideview, setSideView] = useState(false);
  const openButton = useSelector((state: any) => state.button.openButton);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        {isGreeting && <Greetings setIsGreeting={setIsGreeting} />}

        {isCollectionModel && <CollectionModel setIsCollectionModel={setIsCollectionModel}/>}
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
            {openButton === "Size" && <SizeSlider />}
            {openButton === "Case" && <CaseSlider />}
            {openButton === "Band" && <BandSlider />}

            {openButton === null && (
              <div
                className={`h-[53vh] max-h-[29.88rem] min-h-[18.47rem] m-auto max-w-[500px] w-[52vh] relative`}
              >
                {!sideview && (
                  <>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        exit={{ opacity: 0, y: -10 }}
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
                    </AnimatePresence>
                  </>
                )}

                {sideview && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      exit={{ opacity: 0, y: -10 }}
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
                  </AnimatePresence>
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

            <WatchInfo />
            <Footer />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Studio;
