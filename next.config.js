/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "**.baidu.com",
        "port": ""
      },
      {
        "protocol": "https",
        "hostname": "images.pexels.com",
        "port": ""
      },
      {
        "protocol": "https",
        "hostname": "ensemble-updating-divx-advancement.trycloudflare.com",
        "port": ""
      },
      {
        "protocol": "https",
        "hostname": "github.com",
        "port": ""
      }
    ],
  },
};

module.exports = nextConfig;
