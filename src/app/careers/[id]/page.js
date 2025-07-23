
import DetailMain from "@/components/sections/career/DetailMain";
import PageWrapper from "@/components/wrappers/PageWrapper";
import React from "react";



const page = ({params}) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <DetailMain params={params} />
      </PageWrapper>
    </div>
  );
};

export default page;
