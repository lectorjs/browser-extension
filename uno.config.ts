import extractorSvelte from '@unocss/extractor-svelte';
import {
    defineConfig,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';

export default defineConfig({
    content: {
        pipeline: {
            include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html|pcss)($|\?)/, 'src/**/*.{js,ts}'],
        },
    },
    extractors: [extractorSvelte()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    presets: [
        presetUno(),
        presetTypography(),
        presetIcons({
            scale: 'auto' as unknown as number,
            prefix: 'i-',
            warn: true,
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
        }),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: {
                    name: 'Open Sans',
                    weights: ['300', '400', '500', '600', '700', '800', '900'],
                    italic: true,
                },
            },
        }),
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
        },
        fontSize: {
            h1: 'var(--font-size-h1)',
            h2: 'var(--font-size-h2)',
            h3: 'var(--font-size-h3)',
            h4: 'var(--font-size-h4)',
            h5: 'var(--font-size-h5)',
            h6: 'var(--font-size-h6)',
            body: 'var(--font-size-body)',
        },
        colors: {
            border: 'hsl(var(--border) / <alpha-value>)',
            input: 'hsl(var(--input) / <alpha-value>)',
            ring: 'hsl(var(--ring) / <alpha-value>)',
            background: 'hsl(var(--background) / <alpha-value>)',
            foreground: 'hsl(var(--foreground) / <alpha-value>)',
            primary: {
                DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
                foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
            },
            secondary: {
                DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
                foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
            },
            destructive: {
                DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
                foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
            },
            muted: {
                DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
                foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
            },
            accent: {
                DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
                foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
            },
            popover: {
                DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
                foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
            },
            card: {
                DEFAULT: 'hsl(var(--card) / <alpha-value>)',
                foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
            },
        },
        borderRadius: {
            lg: 'var(--radius)',
            md: 'calc(var(--radius) - 2px)',
            sm: 'calc(var(--radius) - 4px)',
        },
    },
});
