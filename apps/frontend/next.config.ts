import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
};

export default nextConfig;
