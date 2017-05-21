export class Alert {
  message: string;
  type: string;

  constructor(message: string, type = 'error') {
    this.message = message;
    this.type = type;
  }
}
