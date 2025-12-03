import { Text } from '@react-email/components';
import { KulipalEmailLayout } from '../../components/layout.component';
import * as React from 'react';
import { AuthThanks } from '../../components/utils.component';

interface PasswordChangedProps {
  username: string;
}

export const PasswordChanged = ({ username }: PasswordChangedProps) => {
  return (
    <KulipalEmailLayout
      dontShowThanks={true}
      heading={'Your Password Has Been Changed'}
      preview={'PASSWORD CHANGED SUCCESSFULLY'}
    >
      <Text>Hi, {username}</Text>
      <Text>
        We wanted to let you know that your password has been successfully
        changed. If you did not make this change, please contact our support
        team immediately
      </Text>
      <Text>
        For your security, remember to keep your password confidential and never
        share it with anyone
      </Text>
      <AuthThanks />
    </KulipalEmailLayout>
  );
};
