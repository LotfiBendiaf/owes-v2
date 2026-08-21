import type { Instrumentation } from "next";
import { logger } from "@/lib/logger";

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  const digest = typeof error === "object" && error !== null && "digest" in error ? String(error.digest) : undefined;
  logger.error("request.error", { message: error instanceof Error ? error.message : String(error), digest, method: request.method, path: request.path, routePath: context.routePath, routeType: context.routeType });
};
