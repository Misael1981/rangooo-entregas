const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  serverExternalPackages: ["@misael1981/rangooo-database"],
};

export default nextConfig;
