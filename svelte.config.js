import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from 'sveltekit-adapter-chrome-extension';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            precompress: false,
            manifest: 'manifest.json',
        }),
        appDir: 'app',
        version: {
            name: process.env.npm_package_version,
        },
    },
};

export default config;
