/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.pexels.com", "t12.baidu.com", "c-ssl.dtstatic.com", "intense-containing-clothing-homeless.trycloudflare.com"],
  },
  env: {
    ComfyUI_BASE_ADDRESS: "https://intense-containing-clothing-homeless.trycloudflare.com",
  },
};

module.exports = nextConfig;
