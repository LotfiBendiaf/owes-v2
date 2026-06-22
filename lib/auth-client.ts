"use client";

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false, defaultValue: "CLIENT", input: false },
        phone: { type: "string", required: false },
        active: { type: "boolean", required: false, defaultValue: true, input: false },
      },
    }),
  ],
});
