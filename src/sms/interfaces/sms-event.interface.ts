export interface ISmsEvent {
  phoneNumber: string;
  message: string;
  senderId?: string;
  channel?: string;
}
