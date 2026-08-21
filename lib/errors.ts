export type AppErrorCode = "AUTHENTICATION" | "AUTHORIZATION" | "NOT_FOUND" | "CONFLICT" | "BUSINESS_RULE";

export class AppError extends Error {
  constructor(public readonly code: AppErrorCode, public readonly safeMessage: string) {
    super(safeMessage);
    this.name = "AppError";
  }
}
