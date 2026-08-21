type LogLevel = "info" | "warn" | "error";

const sensitiveKeys = /password|secret|token|authorization|cookie|email|phone/i;

function sanitize(metadata: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(metadata).map(([key, value]) => [key, sensitiveKeys.test(key) ? "[REDACTED]" : value]));
}

function write(level: LogLevel, event: string, metadata: Record<string, unknown> = {}) {
  const record = JSON.stringify({ timestamp: new Date().toISOString(), level, event, ...sanitize(metadata) });
  if (level === "error") console.error(record);
  else if (level === "warn") console.warn(record);
  else console.info(record);
}

export const logger = {
  info: (event: string, metadata?: Record<string, unknown>) => write("info", event, metadata),
  warn: (event: string, metadata?: Record<string, unknown>) => write("warn", event, metadata),
  error: (event: string, metadata?: Record<string, unknown>) => write("error", event, metadata),
};
