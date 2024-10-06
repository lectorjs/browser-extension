<script lang="ts">
    import { Kbd } from "$lib/components/kbd";
    import { LectorSearch } from "$lib/components/lector-search";
    import { Button } from "$lib/components/ui/button";
    import * as Popover from "$lib/components/ui/popover";
    import { Separator } from "$lib/components/ui/separator";
    import * as Tooltip from "$lib/components/ui/tooltip";

    function handleClearInstance() {
        // TODO: temporary solution
        window.location.reload();
    }
</script>

<div
    role="toolbar"
    class="flex items-center gap-1 bg-background rounded-full border p-1 shadow-sm"
>
    {@render search()}
    <Separator
        orientation="vertical"
        class="h-6"
    />
    {@render font()}
    {@render clearInstance()}
</div>

{#snippet search()}
    <Tooltip.Root openDelay={200}>
        <Tooltip.Trigger>
            <LectorSearch>
                <Button
                    variant="ghost"
                    class="rounded-full px-2"
                >
                    <div class="i-solar:magnifer-linear size-5"></div>
                    <Kbd>
                        <span class="text-xs">⌘</span>
                        K
                    </Kbd>
                </Button>
            </LectorSearch>
        </Tooltip.Trigger>
        <Tooltip.Content>
            <p>Search</p>
        </Tooltip.Content>
    </Tooltip.Root>
{/snippet}

{#snippet font()}
    <Popover.Root>
        <Popover.Trigger
            asChild
            let:builder
        >
            <Tooltip.Root openDelay={200}>
                <Tooltip.Trigger>
                    <Button
                        builders={[builder]}
                        variant="ghost"
                        size="icon"
                        class="rounded-full"
                    >
                        <div class="i-solar:sort-by-alphabet-bold size-5"></div>
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>Font settings</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </Popover.Trigger>
        <Popover.Content>
            <div>Font family</div>
            <div>Font size</div>
            <div>Font style</div>
            <div>Font weight</div>
        </Popover.Content>
    </Popover.Root>
{/snippet}

{#snippet clearInstance()}
    <Tooltip.Root openDelay={200}>
        <Tooltip.Trigger>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-full"
                onclick={handleClearInstance}
            >
                <div class="i-solar:broom-outline size-5"></div>
            </Button>
        </Tooltip.Trigger>
        <Tooltip.Content>
            <p>Clear reader instance</p>
        </Tooltip.Content>
    </Tooltip.Root>
{/snippet}
