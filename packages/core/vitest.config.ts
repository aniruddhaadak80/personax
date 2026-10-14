import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    pool: "forks",
    maxWorkers: 1,
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts"],
  },
});
