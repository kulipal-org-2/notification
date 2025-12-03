import { Section, Column, Img, Row, Link, Text } from "@react-email/components";
import * as React from "react";

export const Footer = () => {
  const baseUrl = "https://kulipal.com";

  const twitterLink = "";
  const instagramLink = "";
  const faceBookLink = "";
  const linkedInLink = "";
  const supportLink = `${baseUrl}/contact`;

  return (
    <Section className="bg-[#2A60F1] font-sans text-white p-5">
      <Text className="">
        Kulipal at the touch of a button? Download our app for Google & Mac
      </Text>
      <Row className="flex gap-5 ml-auto">
        <Column>
          <Link href={""} target="_blank">
            <Img
              src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794863/92d15e81-87ff-491c-82c9-5f06371b1e02.png`}
              width="166"
              height="50"
              alt="get-on-google-play"
            />
          </Link>
        </Column>
        <Column>
          <Link href={""} target="_blank">
            <Img
              src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794882/43309c36-fa21-4028-b7d8-3befc87ff321.png`}
              width="166"
              height="50"
              alt="get-on-app-store"
              style={{ paddingLeft: "10px" }}
            />
          </Link>
        </Column>
      </Row>
      <Text className="text-white">
        You are receiving this email because you created account with us. If you
        have any questions, please email us at{" "}
        <span>
          <Link className="text-white underline" href={supportLink}>
            support@kulipal.com
          </Link>
        </span>{" "}
        or visit our FAQs. You can unsubscribe from these emails{" "}
        <span>
          {" "}
          <Link className="text-white underline" href={supportLink}>
            {" "}
            here
          </Link>
        </span>
      </Text>
      <Row className="text-medium py-3 text-lg text-white flex">
        <Column>
          <Link href={`${baseUrl}/policy`} className="text-white">
            Privacy |{" "}
          </Link>
        </Column>
        <Column>
          <Link href={`${baseUrl}/contact`} className="text-white">
            {" "}
            Help Center |{" "}
          </Link>
        </Column>
        <Column>
          <Link href={`${baseUrl}/faq`} className="text-white">
            FAQS
          </Link>
        </Column>
      </Row>

      <Row className="flex gap-5 ml-auto">
        <Column>
          <Link href={faceBookLink} target="_blank">
            <Img
              src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794900/ae79474c-83ae-4824-850a-11f581b76c8d.png`}
              width="20"
              height="20"
              alt="facebook-logo"
            />
          </Link>
        </Column>
        <Column>
          <Link href={instagramLink} target="_blank">
            <Img
              src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794920/3ee31f4e-472c-4ddd-abc6-901ee94516f1.png`}
              width="20"
              height="20"
              alt="instagram-logo"
              style={{ paddingLeft: "10px" }}
            />
          </Link>
        </Column>
        <Column>
          <Link href={twitterLink} target="_blank">
            <Img
              src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794951/a15e9d92-ad4c-42d0-ad3b-1ec1c7ac62cf.png`}
              width="20"
              height="20"
              alt="twitter-logo"
              style={{ paddingLeft: "10px" }}
            />
          </Link>
        </Column>
        <Column>
          <Link href={linkedInLink} target="_blank">
            <Img
              src={`https://res.cloudinary.com/drtk9whfc/raw/upload/v1722794936/fb6769bd-c352-476c-b3aa-7cf8a69e9112.png`}
              width="20"
              height="20"
              alt="linkedin-logo"
              style={{ paddingLeft: "10px" }}
            />
          </Link>
        </Column>
      </Row>
    </Section>
  );
};
