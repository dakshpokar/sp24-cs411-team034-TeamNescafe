/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		BASEURL: 'http://127.0.0.1:5001/',
	},
	images: {
		domains: ['images.pexels.com'],
	},
};

export default nextConfig;
