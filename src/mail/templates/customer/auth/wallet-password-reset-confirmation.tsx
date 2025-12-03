import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components/layout.component';
import { AuthThanks, OTPtext } from '../../components/utils.component';
import * as React from 'react';

interface WalletPasswordResetConfirmationProps {
  name: string;
  code: string;
}

const WalletPasswordResetConfirmation = ({
  name,
  code,
}: WalletPasswordResetConfirmationProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Wallet Password Reset Confirmation'}
      preview={'Wallet Password Reset Request'}
    >
      <Text>Hi, {name}</Text>
      <Text>
        You have requested to reset your wallet password. Please use the link
        below to set a new password:
      </Text>
      <OTPtext otp={code} />
      <Text>
        This link will expire in 24 hours. If you did not request this, please
        contact our support team immediately.
      </Text>
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
WalletPasswordResetConfirmation.PreviewProps = {
  name: 'Royal Blood',
  code: 'https://www.kulipal.com',
} as WalletPasswordResetConfirmationProps;

export default WalletPasswordResetConfirmation;
