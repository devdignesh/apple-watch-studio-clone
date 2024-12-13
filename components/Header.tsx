import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";

interface HeaderProps {
  isGreeting: boolean;
}

const Header: React.FC<HeaderProps> = ({ isGreeting }) => {
  return (
    <header className="py-[24px] pl-[32px] h-[5.5rem] pr-[20px] flex justify-between items-center ">
      <Link href={"/"}>
        <Image
          src={"/images/apple-watch-design-studio-logo.jpg"}
          height={20}
          width={90}
          className="h-auto object-cover"
          alt="apple-watch-logo"
        />
      </Link>

      {!isGreeting && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="flex items-center -translate-x-5  tracking-tight justify-center font-proTextRegular text-[17px] space-x-1"
          >
            <span>Collections</span>
            <span>
              <IoIosArrowDown size={14} />
            </span>
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeIn" }}
            className="font-proTextRegular bg-[#0071e3] px-4 py-2 rounded-full text-[14px] text-white"
          >
            Save
          </motion.button>
        </>
      )}
    </header>
  );
};

export default Header;
