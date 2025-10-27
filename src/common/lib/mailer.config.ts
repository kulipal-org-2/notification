import { registerAs } from '@nestjs/config';

const ENV_VARIABLES = process.env as any;

export default registerAs('mailer', () => ({
  transport: {
    host: ENV_VARIABLES.EMAIL_HOST,
    port: Number(ENV_VARIABLES.EMAIL_PORT),
    auth: {
      user: ENV_VARIABLES.EMAIL_USERNAME,
      pass: ENV_VARIABLES.EMAIL_PASSWORD,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  },
  defaults: {
    from: `"Kulipal" <${ENV_VARIABLES.EMAIL_FROM}>`,
  },
}));
