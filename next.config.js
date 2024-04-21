/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "t12.baidu.com", "c-ssl.dtstatic.com", "arrive-advisor-catherine-chorus.trycloudflare.com", "img0.baidu.com"],
  },
  env: {
    ComfyUI_BASE_ADDRESS: "https://arrive-advisor-catherine-chorus.trycloudflare.com",
  },
};

module.exports = nextConfig;
