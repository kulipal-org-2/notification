import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components';
import * as React from 'react';
import { AuthThanks, BlueText, OTPtext } from '../../components';

interface OneTimePasswordProps {
  username: string;
  otp: string;
}

export const OneTimePassword = ({ username, otp }: OneTimePasswordProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Verify Your Email Address'}
      preview={'OTP FOR EMAIL VERIFICATION'}
    >
      <Text>Hi, {username}</Text>
      <Text>
        To complete your recent request on Kulipal, please use the One-Time
        Password (OTP) provided below:
      </Text>
      <OTPtext otp={otp} />
      <Text>
        This code is valid for{' '}
        <span>
          <BlueText text=" 5 minutes" />
        </span>
        . If you did not make this request, please disregard this email and
        consider updating your account security settings.
      </Text>
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
OneTimePassword.PreviewProps = {
  username: 'Royal Blood',
  otp: '001234',
} as OneTimePasswordProps;

export default OneTimePassword;
