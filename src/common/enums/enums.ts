export enum StatusTask {
  New,
  IsProcessing,
  Completed,
  Draft,
}

export enum TaskPriority {
  Low,
  Middle,
  High,
  Urgently,
  Later,
}
export enum ResultCodeStatus {
  success = 0,
  fail = 1,
  captcha = 10,
}
export enum AppStatus {
  idle = 'idle',
  loading = 'loading',
  succeeded = 'succeeded',
  failed = 'failed',
}
