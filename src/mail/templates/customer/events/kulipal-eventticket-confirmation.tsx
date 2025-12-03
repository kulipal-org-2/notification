import { Section, Text } from '@react-email/components';
import * as React from 'react';
import { KulipalEmailLayout } from '../../components/layout.component';
import { Helper } from '../../components/utils.component';

interface ticketConfirmationEmailProps {
  event?: string;
  name?: string;
  date: string;
  time: string;
  venue: string;
  orderNumber: string;
  tickets: number;
  totalAmount: string;
}

export const KulipalEventTicketConformationTemplate = ({
  event,
  name,
  date,
  time,
  venue,
  orderNumber,
  tickets,
  totalAmount,
}: ticketConfirmationEmailProps) => (
  <KulipalEmailLayout
    preview="Ticket Purchase Confirmation"
    heading={`Your Ticket Purchase Confirmation for ${event}`}
  >
    <Text className={`text-[#505050] text-lg  font-normal leading-[36px] mb-2`}>
      {`Hi, ${name}`}
    </Text>

    <Text className="text-[#505050] text-lg font-normal leading-[24px]">
      Thank you for your purchase! We are excited to confirm that your ticket
      request for <span className="text-[#2A60F1]">{event}</span> has been
      successfully purchased
    </Text>

    <Section className="text-[#505050] ">
      <Text className="text-2xl font-kanit font-bold">Event Details</Text>
      <Helper question={'Event Name'} answer={event} />
      <Helper question={'Date'} answer={date} />
      <Helper question={'Time'} answer={time} />
      <Helper question={'Venue'} answer={venue} />
    </Section>

    <Section className="text-[#505050] ">
      <Text style={{ fontFamily: 'Kanit' }} className="text-2xl font-bold">
        Order Summary
      </Text>
      <Helper question={'Order Number'} answer={orderNumber} />
      <Helper question={'Ticket(s) Purchased'} answer={tickets} />
      <Helper question={'Total Amount'} answer={totalAmount} />
    </Section>

    <Section className="text-[#505050] ">
      <Text className="text-md font-italic leading-[24px]">
        Please lookout for an email with your ticket details shortly.
      </Text>
    </Section>
  </KulipalEmailLayout>
);

export default KulipalEventTicketConformationTemplate;
