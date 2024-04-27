/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "t12.baidu.com", "c-ssl.dtstatic.com", "reductions-scanners-industrial-courage.trycloudflare.com", "img0.baidu.com"],
  },
  env: {
    ComfyUI_BASE_ADDRESS: "https://reductions-scanners-industrial-courage.trycloudflare.com",
  },
};

module.exports = nextConfig;
