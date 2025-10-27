import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components/layout.component';
import * as React from 'react';
import { AuthThanks, StandardButton } from '../../components/utils.component';

interface PasswordResetProps {
  username: string;
  link: string;
}

const PasswordReset = ({ username, link }: PasswordResetProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Password Reset Request'}
      preview={'USER FORGOT PASSWORD'}
    >
      <Text>Hi, {username}</Text>
      <Text>
        We received a request to reset your password. If you did not request a
        password reset, please ignore this email.
      </Text>
      <Text>To reset your password, click the link below:</Text>
      <StandardButton
        classNameT="!mt-5 !font-medium"
        text="Reset Password"
        link={link}
      />
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
PasswordReset.PreviewProps = {
  username: 'Royal Blood',
  link: 'https://www.kulipal.com',
} as PasswordResetProps;

export default PasswordReset;
