CREATE INDEX "User_role_active_createdAt_idx" ON "User"("role", "active", "createdAt");
CREATE INDEX "ServiceRequest_clientId_createdAt_idx" ON "ServiceRequest"("clientId", "createdAt");
CREATE INDEX "ServiceRequest_status_createdAt_idx" ON "ServiceRequest"("status", "createdAt");
CREATE INDEX "Payment_requestId_status_idx" ON "Payment"("requestId", "status");
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");
CREATE INDEX "FileAsset_ownerId_createdAt_idx" ON "FileAsset"("ownerId", "createdAt");
CREATE INDEX "FileAsset_requestId_createdAt_idx" ON "FileAsset"("requestId", "createdAt");
CREATE INDEX "Article_published_publishedAt_idx" ON "Article"("published", "publishedAt");
CREATE INDEX "ContactMessage_resolved_createdAt_idx" ON "ContactMessage"("resolved", "createdAt");
