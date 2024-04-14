/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "t12.baidu.com", "c-ssl.dtstatic.com", "foster-par-politicians-saved.trycloudflare.com"],
  },
  env: {
    ComfyUI_BASE_ADDRESS: "https://foster-par-politicians-saved.trycloudflare.com",
  },
};

module.exports = nextConfig;
