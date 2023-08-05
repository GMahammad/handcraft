class MessageModel {
  messageId: number;
  messageEmail: string;
  messageTitle: string;
  messageSenderName: string;
  messageBody: string;
  messagePhone: string;
  createdAt: string;
  constructor(
    messageId: number,
    messageEmail: string,
    messageTitle: string,
    messageSenderName: string,
    messageBody: string,
    messagePhone: string,
    createdAt: string
  ) {
    this.messageId = messageId;
    this.messageEmail = messageEmail;
    this.messageTitle = messageTitle;
    this.messageSenderName = messageSenderName;
    this.messageBody = messageBody;
    this.messagePhone = messagePhone;
    this.createdAt = createdAt;
  }
}
export default MessageModel;
