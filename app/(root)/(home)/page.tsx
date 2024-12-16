"use client";
import Header from "@/components/Header";
import Studio from "@/components/Studio";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
  const [isGreeting, setIsGreeting] = useState<boolean>(true);
  const [isCollectionModel, setIsCollectionModel] = useState<boolean>(false);

  return (
    <>
      <Header isGreeting={isGreeting} setIsCollectionModel={setIsCollectionModel}/>
      <Studio setIsGreeting={setIsGreeting} isGreeting={isGreeting} isCollectionModel={isCollectionModel} setIsCollectionModel={setIsCollectionModel}/>
    </>
  );
};

export default page;
