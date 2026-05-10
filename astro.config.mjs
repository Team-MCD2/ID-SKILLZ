// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
	site: "https://id-skillz.com",
	integrations: [react(), sitemap()],
	output: "static",
	adapter: vercel({
		webAnalytics: { enabled: true },
		imageService: true,
	}),
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "viewport",
	},
	vite: {
		plugins: [tailwindcss()],
	},
	build: {
		assets: "_astro",
		inlineStylesheets: "auto",
	},
	image: {
		responsiveStyles: true,
	},
});
