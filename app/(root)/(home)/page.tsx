"use client";
import Header from "@/components/Header";
import Greeting from "@/components/Greeting";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [isGreeting, setIsGreeting] = useState<boolean>(true);

  return (
    <>
      <Header isGreeting={isGreeting}/>
      <Greeting setIsGreeting={setIsGreeting} isGreeting={isGreeting} />
    </>
  );
};

export default page;
