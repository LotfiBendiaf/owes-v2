import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";
import { getAuthEnv } from "@/lib/env";
import { isEmailDeliveryConfigured, sendTransactionalEmail } from "@/lib/email";

const authEnv = getAuthEnv();
const emailDeliveryEnabled = isEmailDeliveryConfigured();

export const auth = betterAuth({
  baseURL: authEnv.BETTER_AUTH_URL,
  secret: authEnv.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: emailDeliveryEnabled,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => sendTransactionalEmail({ to: user.email, subject: "Réinitialisez votre mot de passe OWES", html: `<p><a href="${url}">Réinitialiser votre mot de passe OWES</a></p><p>Ce lien expire dans une heure.</p>` }),
  },
  emailVerification: {
    sendOnSignUp: emailDeliveryEnabled,
    sendOnSignIn: emailDeliveryEnabled,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => sendTransactionalEmail({ to: user.email, subject: "Vérifiez votre adresse e-mail OWES", html: `<p><a href="${url}">Vérifier mon adresse e-mail</a></p>` }),
  },
  rateLimit: {
    enabled: true,
    window: 60,
    max: 30,
    customRules: {
      "/sign-in/email": { window: 60, max: 5 },
      "/sign-up/email": { window: 60, max: 5 },
    },
  },
  user: {
    additionalFields: {
      role: { type: "string", required: false, defaultValue: "CLIENT", input: false },
      phone: { type: "string", required: false },
      active: { type: "boolean", required: false, defaultValue: true, input: false },
    },
  },
  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const user = await prisma.user.findUnique({ where: { id: session.userId }, select: { active: true } });
          return user?.active !== false;
        },
      },
    },
  },
  plugins: [nextCookies()],
});
