export class Modal {
  message: string;
  title = '確認';
  okMessage = 'OK';
  cancelMessage = 'キャンセル';

  constructor(message: string, options?: { title?: string; okMessage?: string; cancelMessage?: string }) {
    this.message = message;
    if (options) {
      this.title = options.title;
      this.okMessage = options.okMessage;
      this.cancelMessage = options.cancelMessage;
    }
  }
}
