import { sveltekit } from '@sveltejs/kit/vite';
import unocss from 'unocss/vite';
import autoimport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        autoimport({
            imports: [
                {
                    'webextension-polyfill': [['*', 'browserExt']],
                },
            ],
            dts: 'src/@types/auto-imports.d.ts',
        }),
        unocss(),
        sveltekit(),
    ],
});
