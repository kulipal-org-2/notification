import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components/layout.component';
import * as React from 'react';
import { AuthThanks, StandardButton } from '../../components/utils.component';

interface PasswordResetConfirmationProps {
  name: string;
  link: string;
}

const PasswordResetConfirmation = ({
  name,
  link,
}: PasswordResetConfirmationProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Password Reset Confirmation'}
      preview={'USER REQUESTED RESET PASSWORD'}
    >
      <Text>Hi, {name}</Text>
      <Text>
        You have requested to reset your password. Please use the link below to
        set a new password:
      </Text>
      <StandardButton
        classNameT="!my-3 !font-medium"
        text="Set a New Password"
        link={link}
      />
      <Text>
        This link will expire in 24 hours. If you did not request this, please
        contact our support team immediately.
      </Text>
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
PasswordResetConfirmation.PreviewProps = {
  name: 'Royal Blood',
  link: 'https://www.kulipal.com',
} as PasswordResetConfirmationProps;

export default PasswordResetConfirmation;
