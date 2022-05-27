import { config, createSchema } from "@keystone-next/keystone/schema";
import "dotenv/config";

const databaseURL =
  process.env.DATABASE_URL || "mongodb://localhost/keystone-hortus-test";

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: "mongoose",
    url: databaseURL,
  },
  lists: createSchema({}),
  ui: {
    isAccessAllowed: () => true,
  },
});
