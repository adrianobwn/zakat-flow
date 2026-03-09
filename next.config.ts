import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true, // Disabling as it might interfere with Prisma evaluation on build
  serverExternalPackages: ['@prisma/client', 'bcrypt'],
};

export default nextConfig;
