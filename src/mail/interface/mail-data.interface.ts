export interface IEmailData {
  to: string;
  subject: string;
  html: string;
}

export interface IGenericEmailEvent<T = Record<string, any>> {
  template: string;
  email: string;
  subject: string;
  data: T;
}
