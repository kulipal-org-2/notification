import { Img, Section, Text } from '@react-email/components';
import * as React from 'react';
import { KulipalEmailLayout } from '../../components/layout.component';
import { Helper } from '../../components/utils.component';

interface ticketConfirmationEmailProps {
  event?: string;
  customer?: string;
  date: string;
  time: string;
  venue: string;
  ticketId: number;
  base64String: string;
}

export const KulipalEventCustomerCopy = ({
  event,
  customer,
  date,
  time,
  venue,
  ticketId,
  base64String,
}: ticketConfirmationEmailProps) => (
  <KulipalEmailLayout
    preview="Ticket- Customer copy"
    heading={`Your E-Ticket for ${event}`}
    showFooter={false}
  >
    <Text className={`text-[#505050] text-lg  font-normal leading-[36px] mb-2`}>
      {`Hi, ${customer}`}
    </Text>
    <Text className="text-[#505050]  text-lg font-normal leading-[24px]">
      Attached is your e-ticket for{' '}
      <span className="text-[#2A60F1]">{event}</span>. Please bring this ticket
      with you to the event.
    </Text>
    <Section className="text-[#505050] ">
      <Text className="text-2xl font-kanit font-bold">Event Details</Text>
      <Helper question={'Event Name'} answer={event} />
      <Helper question={'Date'} answer={date} />
      <Helper question={'Time'} answer={time} />
      <Helper question={'Venue'} answer={venue} />
      <Helper question={'Ticket ID'} answer={ticketId} />
    </Section>
    <Img
      src={`data:image/png;base64,${base64String}`}
      alt="Cat"
      width="300"
      height="300"
    />
  </KulipalEmailLayout>
);

export default KulipalEventCustomerCopy;
