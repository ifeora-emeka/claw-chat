import type { NextConfig } from "next";
import { resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(__dirname, "../.env") });

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
};

export default nextConfig;
