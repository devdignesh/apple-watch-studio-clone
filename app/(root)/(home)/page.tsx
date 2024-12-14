"use client";
import Header from "@/components/Header";
import Studio from "@/components/Studio";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [isGreeting, setIsGreeting] = useState<boolean>(true);

  return (
    <>
      <Header isGreeting={isGreeting}/>
      <Studio setIsGreeting={setIsGreeting} isGreeting={isGreeting} />
    </>
  );
};

export default page;
