
import React, { Suspense } from "react";
import Save from "@/components/Save";

const page = () => {
  return (
    <Suspense>
      <Save />
    </Suspense>
  );
};

export default page;
