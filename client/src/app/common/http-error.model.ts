/**
 * レスポンスエラーのインタフェース
 */
export interface HttpError {
  id: number;
  status: string;
  message: string;
}
