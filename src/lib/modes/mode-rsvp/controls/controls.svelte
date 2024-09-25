<script lang="ts">
    import { Kbd } from "$lib/components/kbd/index.ts";
    import { Button } from "$lib/components/ui/button";
    import * as HoverCard from "$lib/components/ui/hover-card";
    import { cn } from "$lib/utils.ts";
    import type { RsvpMode } from "@lectorjs/mode-rsvp";
    import type { Reader } from "@lectorjs/primitives";
    import { blur } from "svelte/transition";
    import { modeRsvpStore } from "../mode-rsvp.svelte.ts";

    type Props = {
        reader: Reader<RsvpMode> | undefined;
    };

    const { reader }: Props = $props();

    function toggleZenMode() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    }
</script>

<div
    in:blur
    out:blur
    role="toolbar"
    tabindex="0"
    class={cn("grid grid-cols-3 items-center gap-4 px-4 border-t bg-background", {
        "cursor-not-allowed filter-blur-sm": !reader,
    })}
    onmouseenter={() => (modeRsvpStore.isHoveringInteractiveUi = true)}
    onmouseleave={() => (modeRsvpStore.isHoveringInteractiveUi = true)}
>
    {@render controlsLeft()}
    {@render controlsCenter()}
    {@render controlsRight()}
</div>

{#snippet controlsLeft()}
    <div
        class={cn("flex items-center gap-2 justify-start", {
            "pointer-events-none": !reader,
        })}
    >
        <HoverCard.Root>
            <HoverCard.Trigger
                asChild
                let:builder
            >
                <Button
                    builders={[builder]}
                    variant="secondary"
                    size="sm"
                >
                    <div class="i-carbon:information size-5"></div>
                </Button>
            </HoverCard.Trigger>
            <HoverCard.Content class="min-w-[300px] w-auto text-sm">
                <div>
                    <h3 class="uppercase text-xs font-semibold mb-2">Stats</h3>
                    <ul class="bg-accent p-4 rounded-lg space-y-3">
                        <li>Reading time: 5.2 min</li>
                    </ul>
                </div>

                <div class="mt-4">
                    <h3 class="uppercase text-xs font-semibold mb-2">Shortcuts</h3>
                    <div class="p-4 rounded-lg grid grid-cols-3 gap-y-4 gap-x-6">
                        <div class="flex items-center gap-2">
                            Toggle play
                            <Kbd>Space</Kbd>
                        </div>
                    </div>
                </div>
            </HoverCard.Content>
        </HoverCard.Root>
        <Button
            variant="outline"
            size="sm"
            onclick={() => reader?.commands.goToStart()}
        >
            <div class="i-carbon:arrow-left size-3"></div>
            Start
        </Button>
        <Button
            variant="outline"
            size="sm"
            onclick={() => reader?.commands.goToEnd()}
        >
            End
            <div class="i-carbon:arrow-right size-3"></div>
        </Button>
    </div>
{/snippet}

{#snippet controlsCenter()}
    <div
        class={cn("flex items-center gap-2 justify-center", {
            "pointer-events-none": !reader,
        })}
    >
        <Button
            variant="outline"
            class="rounded-full h-auto w-auto p-3 active:scale-90"
            onclick={() => reader?.commands.goBackward()}
        >
            <div class="i-carbon:skip-back size-5"></div>
        </Button>
        <Button
            variant="default"
            class="rounded-full h-auto w-auto p-3 active:scale-90"
            onclick={() => reader?.commands.toggle()}
        >
            {#if modeRsvpStore.isPlaying}
                <div class="i-carbon:pause size-7"></div>
            {:else}
                <div class="i-carbon:play size-7"></div>
            {/if}
        </Button>
        <Button
            variant="outline"
            class="rounded-full h-auto w-auto p-3 active:scale-90"
            onclick={() => reader?.commands.goForward()}
        >
            <div class="i-carbon:skip-forward size-5"></div>
        </Button>
    </div>
{/snippet}

{#snippet controlsRight()}
    <div
        class={cn("flex items-center gap-2 justify-end", {
            "pointer-events-none": !reader,
        })}
    >
        <Button
            variant="ghost"
            size="icon"
            onclick={toggleZenMode}
        >
            <div class="i-twemoji:letter-z size-5"></div>
        </Button>
        <Button
            variant="ghost"
            size="icon"
        >
            <div class="i-carbon:playlist size-5"></div>
        </Button>
    </div>
{/snippet}
