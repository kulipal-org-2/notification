import {
  Button,
  Column,
  Container,
  Img,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

export const StandardButton = ({
  link,
  text,
  classNameT,
}: {
  link: string;
  text: string;
  classNameT?: string;
}) => {
  return (
    <Button
      className={`bg-primary px-6 rounded-xl  py-2 text-lg font-semibold text-center text-white ${classNameT}`}
      href={link}
    >
      {text}
    </Button>
  );
};
export const Helper = ({
  question,
  answer,
  className,
  questionClass,
  answerClass,
}: {
  question: string;
  answer: string | number | React.ReactNode;
  className?: string;
  questionClass?: string;
  answerClass?: string;
}) => (
  <Row className={`flex py-1 text-[#505050] ${className}`}>
    <Column
      className={`font-semibold  pr-2 ${questionClass}`}
    >{`${question}:`}</Column>
    <Column className={`${answerClass}`}>{answer}</Column>
  </Row>
);
export const BlueText = ({ text }: { text: string }) => (
  <span className="text-primary font-semibold">{text}</span>
);
export const SuccessfulSection = ({ text }: { text: string }) => (
  <Section
    style={{ boxShadow: '0px 4px 64px 0px #00000026' }}
    className="flex justify-center p-4 text-center w-[18rem] rounded-3xl mx-auto"
  >
    <Container className=" bg-white flex flex-col items-center mx-auto">
      <Img
        src="https://res.cloudinary.com/drtk9whfc/raw/upload/v1725000944/ff620802-6c7c-4dcf-8a1c-c85a7f49ea9d.png"
        alt="Success"
        width="120"
        height="120"
        className="mx-auto"
      />
      <Text className="text-xl font-kanit font-semibold">{text}</Text>
    </Container>
  </Section>
);
export const AuthThanks = () => (
  <Section>
    <Text>Thank you</Text>
    <Text>- Kulipal Support Team</Text>
  </Section>
);
export const OTPtext = ({ otp }: { otp: string }) => (
  <Text className="tracking-[2rem] text-center font-bold text-5xl">{otp}</Text>
);
