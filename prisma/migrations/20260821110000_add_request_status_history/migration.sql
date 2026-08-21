CREATE TABLE "RequestStatusEvent" (
    "id" TEXT NOT NULL,
    "from" "RequestStatus" NOT NULL,
    "to" "RequestStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requestId" TEXT NOT NULL,
    "actorId" TEXT,

    CONSTRAINT "RequestStatusEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "RequestStatusEvent_requestId_createdAt_idx"
ON "RequestStatusEvent"("requestId", "createdAt");

CREATE INDEX "RequestStatusEvent_actorId_createdAt_idx"
ON "RequestStatusEvent"("actorId", "createdAt");

ALTER TABLE "RequestStatusEvent" ADD CONSTRAINT "RequestStatusEvent_requestId_fkey"
FOREIGN KEY ("requestId") REFERENCES "ServiceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "RequestStatusEvent" ADD CONSTRAINT "RequestStatusEvent_actorId_fkey"
FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
