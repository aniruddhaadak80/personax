import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    pool: "forks",
    maxWorkers: 1,
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
