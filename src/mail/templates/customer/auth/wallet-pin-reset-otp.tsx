import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components/layout.component';
import { AuthThanks, BlueText, OTPtext } from '../../components/utils.component';
import * as React from 'react';

interface WalletPinResetOTPProps {
  username: string;
  otp: string;
  validityMinutes?: string;
}

export const WalletPinResetOTP = ({
  username,
  otp,
  validityMinutes = '15',
}: WalletPinResetOTPProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Reset Your Wallet PIN'}
      preview={'OTP FOR WALLET PIN RESET'}
    >
      <Text>Hi, {username}</Text>
      <Text>
        You have requested to reset your wallet PIN. Please use the One-Time Password (OTP) below to proceed:
      </Text>
      <OTPtext otp={otp} />
      <Text>
        This code is valid for{' '}
        <span>
          <BlueText text={` ${validityMinutes} minutes`} />
        </span>
        . If you did not request this, please contact our support team immediately.
      </Text>
      <AuthThanks />
    </KulipalEmailLayout>
  );
};

// Optional: Preview props for development
WalletPinResetOTP.PreviewProps = {
  username: 'Royal Blood',
  otp: '123456',
  validityMinutes: '15',
} as WalletPinResetOTPProps;