import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components';
import * as React from 'react';
import { AuthThanks, BlueText, OTPtext } from '../../components';

interface EmailVerificationOTPProps {
  username: string;
  otp: string;
}

export const EmailVerificationOTP = ({
  username,
  otp,
}: EmailVerificationOTPProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Verify Your Email Address'}
      preview={'OTP FOR EMAIL VERIFICATION'}
    >
      <Text>Hi, {username}</Text>
      <Text>
        Thank you for signing up with{' '}
        <span>
          <BlueText text="Kulipal" />
        </span>
        . Please verify your email address by using the One-Time Password (OTP)
        provided below:
      </Text>
      <OTPtext otp={otp} />
      <Text>
        This code is valid for{' '}
        <span>
          <BlueText text=" 5 minutes" />
        </span>
        . If you did not sign up for an account, please disregard this email.
      </Text>
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
