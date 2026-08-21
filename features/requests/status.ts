import type { RequestStatus } from "@prisma/client";

const transitions = {
  DRAFT: ["SUBMITTED", "CANCELLED"],
  SUBMITTED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
} satisfies Record<RequestStatus, readonly RequestStatus[]>;

export function canTransitionRequest(from: RequestStatus, to: RequestStatus) {
  return from === to || (transitions[from] as readonly RequestStatus[]).includes(to);
}

export function allowedRequestTransitions(from: RequestStatus) {
  return transitions[from];
}
