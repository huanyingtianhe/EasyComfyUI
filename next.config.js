/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    "imageSizes": [15, 40, 100, 240, 256, 512, 640, 1080, 2048, 3840],
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
        "hostname": "**.trycloudflare.com",
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
