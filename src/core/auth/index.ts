import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { configs } from "@/config";
import { db } from "@/core/db";
import * as schema from "@/config/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db(), {
    provider: getDatabaseProvider(),
    schema: schema,
  }),
  secret: configs.betterAuthSecret ?? "",
  socialProviders: getSocialProviders(),
});

function getDatabaseProvider(): "sqlite" | "pg" | "mysql" {
  switch (configs.databaseDriver) {
    case "sqlite":
      return "sqlite";
    case "postgresql":
      return "pg";
    case "mysql":
      return "mysql";
    default:
      throw new Error(
        `Unsupported database provider for auth: ${configs.databaseProvider}`
      );
  }
}

function getSocialProviders() {
  const providers: any = {};

  if (true) {
    providers.google = {
      clientId: configs.googleClientId,
      clientSecret: configs.googleClientSecret,
    };
  }

  if (true) {
    providers.github = {
      clientId: configs.githubClientId,
      clientSecret: configs.githubClientSecret,
    };
  }

  return providers;
}
