import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components/layout.component';
import * as React from 'react';
import {
  AuthThanks,
  Helper,
  StandardButton,
} from '../../components/utils.component';

interface LoginAlertProps {
  username: string;
  device: string;
  location: string;
  time: string;
  link: string;
}

export const LoginAlert = ({
  username,
  device,
  time,
  link,
}: LoginAlertProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Login Alert for your Account'}
      preview={'LOGIN NOTIFICATION'}
    >
      <Text>Hi, {username}</Text>
      <Text>
        We noticed a new login to your account from a new device or location.
      </Text>
      <Text className="font-semibold text-xl">Details</Text>
      <Helper question="Device" answer={device} />
      <Helper question="Time" answer={time} />
      <StandardButton
        classNameT="!mt-5 !font-medium"
        text="I do not recognize this device"
        link={link}
      />
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
