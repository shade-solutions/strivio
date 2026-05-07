import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/db/schema";
import { requireEnv } from "@/lib/env";

neonConfig.fetchConnectionCache = true;

const sql = neon(requireEnv("DATABASE_URL"));

export const db = drizzle(sql, { schema });
