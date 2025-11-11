import { ConfigModuleOptions } from '@nestjs/config';
import mailerConfig from './mailer.config';
import firebaseConfig from './firebase.config';

export const ConfigRootOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [mailerConfig, firebaseConfig],
  ignoreEnvFile: false,
};
