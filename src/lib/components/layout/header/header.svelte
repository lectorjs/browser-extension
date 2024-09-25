<script>
    import { Kbd } from "$lib/components/kbd";
    import { Link } from "$lib/components/link";
    import Button from "$lib/components/ui/button/button.svelte";
    import { LECTOR_WEBSITE_URL } from "$lib/constants";
</script>

<header class="bg-background border-b px-4">
    <div class="h-full flex items-center justify-between gap-4">
        {@render actionsLeft()}
        {@render actionsRight()}
    </div>
</header>

{#snippet actionsLeft()}
    <div class="flex items-center gap-2">
        <Link href={LECTOR_WEBSITE_URL}>
            <img
                src="/lector-logo-font/svg/logo-no-background.svg"
                alt="Lector logo"
                class="w-full h-7 object-contain"
            />
        </Link>
    </div>
{/snippet}

{#snippet actionsRight()}
    <div class="flex items-center gap-2">
        <Button
            variant="outline"
            size="sm"
            class="min-w-[170px] justify-between"
        >
            <div class="flex items-center gap-2">
                <div class="i-carbon:search size-4"></div>
                Search...
            </div>
            <Kbd>
                <span class="text-xs">⌘</span>
                K
            </Kbd>
        </Button>
        <Button
            variant="secondary"
            size="sm"
        >
            <div class="i-carbon:translate size-4"></div>
            <span class="sr-only sm:not-sr-only">Español</span>
        </Button>
        <Button
            variant="secondary"
            size="sm"
        >
            <div class="i-carbon:color-palette size-4"></div>
            <span class="sr-only sm:not-sr-only">Theme</span>
        </Button>
        <Button
            variant="secondary"
            size="sm"
        >
            <div class="i-solar:heart-bold-duotone size-5 text-red-500"></div>
        </Button>
        <Button
            variant="secondary"
            size="sm"
        >
            <div class="i-carbon:settings size-5"></div>
        </Button>
        <Button size="sm">
            <div class="i-carbon:document-add size-4"></div>
            Import
        </Button>
    </div>
{/snippet}
