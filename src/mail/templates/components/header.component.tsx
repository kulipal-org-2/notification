import * as React from "react";
import { Img, Section } from "@react-email/components";

export const KulipalEmailHeader = () => {
  return (
    <Section className="w-full h-24 ">
      <Img
        src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794966/69386d9f-6c1d-4630-87a0-7c836959a479.png`}
        width="140"
        height="60"
        alt="logo"
        className="pl-[16px]"
      />
    </Section>
  );
};
