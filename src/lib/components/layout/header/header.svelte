<script>
    import { LectorLibrary } from "$lib/components/lector-library";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { LECTOR_DONATE_URL, LECTOR_WEBSITE_URL } from "$lib/constants";
    import { resetMode, setMode } from "mode-watcher";
</script>

<header class="px-4 bg-background border-b">
    <div class="h-full flex items-center justify-between gap-4">
        {@render actionsLeft()}
        {@render actionsRight()}
    </div>
</header>

{#snippet actionsLeft()}
    <div class="flex items-center gap-2">
        <Button
            href={LECTOR_WEBSITE_URL}
            variant="link"
        >
            <img
                src="/lector-logo-font/svg/logo-no-background.svg"
                alt="Lector logo"
                class="w-full h-7 object-contain"
            />
        </Button>
    </div>
{/snippet}

{#snippet actionsRight()}
    <div class="flex items-center gap-2">
        <Button
            variant="secondary"
            size="sm"
        >
            <div class="i-emojione:flag-for-united-states size-5"></div>
            <span class="sr-only sm:not-sr-only">English</span>
        </Button>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger
                asChild
                let:builder
            >
                <Button
                    builders={[builder]}
                    variant="secondary"
                    size="sm"
                >
                    <div class="i-solar:pallete-2-linear size-5"></div>
                    <span class="sr-only sm:not-sr-only">Theme</span>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item on:click={() => setMode("light")}>Light</DropdownMenu.Item>
                <DropdownMenu.Item on:click={() => setMode("dark")}>Dark</DropdownMenu.Item>
                <DropdownMenu.Item on:click={() => resetMode()}>System</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
        <Button
            href={LECTOR_DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            size="sm"
        >
            <div class="i-solar:heart-bold-duotone size-5 text-red-500"></div>
        </Button>
        <Button
            variant="secondary"
            size="sm"
        >
            <div class="i-solar:settings-linear size-5"></div>
        </Button>
        <Button
            size="sm"
            variant="outline"
        >
            <div class="i-solar:three-squares-bold-duotone size-5"></div>
            Plugins
        </Button>
        <LectorLibrary>
            <Button size="sm">
                <div class="i-solar:library-line-duotone size-5"></div>
                Library
            </Button>
        </LectorLibrary>
    </div>
{/snippet}
