export class Modal {
  message: string;
  okCallback: () => void;
  cancelCallback: () => void;
  title = '確認';
  okMessage = 'OK';
  cancelMessage = 'キャンセル';

  constructor(message: string, okCallback: () => void, cancelCallback: () => void,
              options?: { title?: string, okMessage?: string, cancelMessage?: string }) {
    this.message = message;
    this.okCallback = okCallback;
    this.cancelCallback = cancelCallback;
    if (options) {
      this.title = options.title;
      this.okMessage = options.okMessage;
      this.cancelMessage = options.cancelMessage;
    }
  }
}
