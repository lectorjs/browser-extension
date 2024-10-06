<script lang="ts">
    import { version } from "$app/environment";
    import { Badge } from "$lib/components/ui/badge";
    import { Button, buttonVariants } from "$lib/components/ui/button";
    import { Separator } from "$lib/components/ui/separator";
    import {
        LECTOR_DONATE_URL,
        LECTOR_FEEDBACK_URL,
        LECTOR_HELP_URL,
        LECTOR_RELEASES_URL,
        LECTOR_WEBSITE_URL,
    } from "$lib/constants";
    import { cn } from "$lib/utils";
</script>

<div class="w-[360px] bg-popover border border-border/80 overflow-hidden">
    {@render header()}
    <Separator />
    {@render pageSettings()}
    <Separator />
    {@render globalSettings()}
    <Separator />
    {@render actions()}
    <Separator />
    {@render donate()}
    {@render footer()}
</div>

{#snippet header()}
    <header class="px-2 py-2 flex items-center justify-between">
        <Button href={LECTOR_WEBSITE_URL}>
            <img
                src="/lector-logo-font/svg/logo-no-background.svg"
                alt="Lector logo"
                class="w-full h-8 object-contain"
            />
        </Button>

        <Button href={LECTOR_RELEASES_URL}>
            <Badge variant="secondary">
                v{version}
            </Badge>
        </Button>
    </header>
{/snippet}

{#snippet pageSettings()}
    <div class="px-2 py-4 flex items-center justify-between">
        <h2 class="font-semibold text-xs">Page settings</h2>
        <span class="text-xs text-foreground-muted">Current website</span>
    </div>
{/snippet}

{#snippet globalSettings()}
    <div class="px-2 py-4 flex items-center justify-between">
        <h2 class="font-semibold text-xs">Global settings</h2>
        <span class="text-xs text-foreground-muted">All websites</span>
    </div>
{/snippet}

{#snippet actions()}
    <div class="px-2 py-4 grid gap-3">
        <button
            class={cn(buttonVariants({ variant: "secondary" }), "w-full justify-between")}
            onclick={async () => {
                // await browserExt.windows.create({
                //     url: browserExt.runtime.getURL("reader.html"),
                //     type: "popup",
                // });
            }}
        >
            <div class="flex items-center gap-3">
                <div class="i-vscode-icons:default-file size-5"></div>
                Launch reader
            </div>

            <div class="i-solar:arrow-right-up-line-duotone text-xl"></div>
        </button>
    </div>
{/snippet}

{#snippet donate()}
    <div class="mx-2 my-4 p-2 bg-rose/05 border border-rose/40 rounded-lg">
        <h3 class="font-semibold text-sm text-rose-700">Support the project</h3>
        <p class="text-sm mt-2">
            Lector is 100% free and open-source, offering barrier-free reading for everyone. Please consider helping us
            maintain this project by making a donation!
        </p>
        <Button
            href={LECTOR_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            class="gap-1 mt-4 bg-rose-600 hover:bg-rose-600/90 text-white"
        >
            <div class="i-solar:heart-bold size-5"></div>
            Donate
        </Button>
    </div>
{/snippet}

{#snippet footer()}
    <footer class="px-2 py-2 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Button
                href={LECTOR_FEEDBACK_URL}
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs"
            >
                Send feedback
            </Button>
            ·
            <Button
                href={LECTOR_HELP_URL}
                variant="link"
                target="_blank"
                rel="noopener noreferrer"
                class="text-xs"
            >
                Need help?
            </Button>
        </div>

        <button
            class={cn(buttonVariants({ variant: "secondary", size: "icon" }))}
            onclick={async () => {
                // await browserExt.runtime.openOptionsPage();
            }}
        >
            <div class="i-solar:settings-linear size-5"></div>
            <span class="sr-only">Options</span>
        </button>
    </footer>
{/snippet}
