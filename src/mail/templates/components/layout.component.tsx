import {
  Html,
  Tailwind,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
} from '@react-email/components';
import * as React from 'react';
import { Footer } from './footer.component';
import { KulipalHead } from './head.component';
import { KulipalEmailHeader } from './header.component';
import { BlueText } from './utils.component';

interface LayoutProps {
  heading: string;
  preview: string;
  dontShowThanks?: boolean;
  showFooter?: boolean;
}

export const KulipalEmailLayout: React.FC<LayoutProps> = ({
  heading,
  preview,
  children,
  dontShowThanks = false,
  showFooter = true,
}) => {
  const config = {
    theme: {
      extend: {
        colors: {
          brand: '#007291',
          primary: '#2A60F1',
          myAsh: '#505050',
          myGreen: '#0DBA67',
          myRed: '#EB2931',
        },
        fontFamily: {
          sans: ['"DM Sans",sans-serif'],
          kanit: ['"Kanit",sans-serif'],
        },
      },
    },
  };
  return (
    <Html>
      <Tailwind config={config}>
        <KulipalHead />
        <Preview>{preview}</Preview>
        <Body className="bg-[#ffffff]">
          <Container className="px-3 mx-auto max-w-[600px] text-myAsh">
            <KulipalEmailHeader />
            <Section className="p-4">
              <Heading className="text-[#505050]   text-3xl font-bold my-5">
                {heading}
              </Heading>
              {children}
              {!dontShowThanks && (
                <Section>
                  <Text className=" text-[#505050]">
                    Thank you for choosing <BlueText text="Kulipal" />
                  </Text>
                  <Text className="">- Kulipal Team</Text>
                </Section>
              )}
            </Section>
            {showFooter && <Footer />}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
