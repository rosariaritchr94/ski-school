/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // vecchi indirizzi brevi
      { source: "/prenota", destination: "https://scuolascigranparadiso.beebeeboard.com/scuolesci_ecommerce/", permanent: false },
      { source: "/contatti", destination: "/#contatti", permanent: false },
    ];
  },
};
export default nextConfig;
