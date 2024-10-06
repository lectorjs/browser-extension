<script lang="ts">
    import { Kbd } from "$lib/components/kbd/index.ts";
    import { Button } from "$lib/components/ui/button";
    import * as HoverCard from "$lib/components/ui/hover-card";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Slider } from "$lib/components/ui/slider";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { RSVP_WPC_INCREASE_VALUE, RSVP_WPM_DECREASE_VALUE, RSVP_WPM_INCREASE_VALUE } from "$lib/constants.ts";
    import { cn } from "$lib/utils.ts";
    import type { RsvpMode } from "@lectorjs/mode-rsvp";
    import { context } from "@lectorjs/mode-rsvp";
    import type { Reader } from "@lectorjs/primitives";
    import { modeRsvpStore } from "../mode-rsvp.svelte.ts";
    import Progress from "./progress.svelte";

    type Props = {
        reader: Reader<RsvpMode> | undefined;
    };

    const { reader }: Props = $props();

    let isFullScreen = $state(false);

    $effect(() => {
        if (!reader) {
            return;
        }

        const wpm = modeRsvpStore.wpm;
        const wpc = modeRsvpStore.wpc;

        context.update(() => ({
            options: {
                wordsPerMinute: wpm,
                wordsPerCycle: wpc,
            },
        }));
    });

    $effect(() => {
        if (isFullScreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    });

    function handleWpmIncrement() {
        modeRsvpStore.wpm += RSVP_WPM_INCREASE_VALUE;
    }

    function handleWpmDecrement() {
        modeRsvpStore.wpm -= RSVP_WPM_DECREASE_VALUE;
    }

    function handleWpmWheel(event: WheelEvent) {
        event.deltaY < 0 ? handleWpmDecrement() : handleWpmIncrement();
    }

    function handleWpcIncrement() {
        modeRsvpStore.wpc += RSVP_WPC_INCREASE_VALUE;
    }

    function handleWpcDecrement() {
        modeRsvpStore.wpc -= RSVP_WPC_INCREASE_VALUE;
    }

    function handleWpcWheel(event: WheelEvent) {
        event.deltaY < 0 ? handleWpcDecrement() : handleWpcIncrement();
    }
</script>

<div
    role="toolbar"
    tabindex="0"
    class={cn("flex flex-col", { "cursor-not-allowed filter-blur-sm": !reader })}
    onmouseenter={() => (modeRsvpStore.isHoveringInteractiveUi = true)}
    onmouseleave={() => (modeRsvpStore.isHoveringInteractiveUi = false)}
>
    <Progress {reader} />
    <div class="flex-1 grid grid-cols-3 items-center gap-4 px-4 bg-background">
        {@render controlsLeft()}
        {@render controlsCenter()}
        {@render controlsRight()}
    </div>
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
                    <div class="i-solar:info-circle-line-duotone size-6"></div>
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
            Start
        </Button>
        <Button
            variant="outline"
            size="sm"
            onclick={() => reader?.commands.goToEnd()}
        >
            End
        </Button>
    </div>
{/snippet}

{#snippet controlsCenter()}
    <div
        class={cn("flex items-center gap-2 justify-center", {
            "pointer-events-none": !reader,
        })}
    >
        <Tooltip.Root openDelay={500}>
            <Tooltip.Trigger
                asChild
                let:builder
            >
                <Button
                    builders={[builder]}
                    variant="secondary"
                    class="rounded-full h-auto w-auto p-3 active:scale-90"
                    onclick={() => reader?.commands.goBackward()}
                >
                    <div class="i-solar:skip-previous-outline size-6"></div>
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <p>Skip back</p>
            </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root openDelay={500}>
            <Tooltip.Trigger
                asChild
                let:builder
            >
                <Button
                    builders={[builder]}
                    variant="default"
                    class="rounded-full h-auto w-auto p-3 active:scale-90"
                    onclick={() => reader?.commands.toggle()}
                >
                    {#if modeRsvpStore.isPlaying}
                        <div class="i-solar:pause-outline size-7"></div>
                    {:else}
                        <div class="i-solar:play-outline size-7"></div>
                    {/if}
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                {#if modeRsvpStore.isPlaying}
                    <p>Pause</p>
                {:else}
                    <p>Play</p>
                {/if}
            </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root openDelay={500}>
            <Tooltip.Trigger
                asChild
                let:builder
            >
                <Button
                    builders={[builder]}
                    variant="secondary"
                    class="rounded-full h-auto w-auto p-3 active:scale-90"
                    onclick={() => reader?.commands.goForward()}
                >
                    <div class="i-solar:skip-next-outline size-6"></div>
                </Button>
            </Tooltip.Trigger>
            <Tooltip.Content>
                <p>Skip forward</p>
            </Tooltip.Content>
        </Tooltip.Root>
    </div>
{/snippet}

{#snippet controlsRight()}
    <div
        class={cn("flex items-center gap-2 justify-end", {
            "pointer-events-none": !reader,
        })}
    >
        {@render wpm()}
        {@render wpc()}
    </div>
{/snippet}

{#snippet wpm()}
    <Popover.Root portal={null}>
        <Popover.Trigger
            asChild
            let:builder
        >
            <Button
                builders={[builder]}
                variant="outline"
                size="sm"
                onwheel={handleWpmWheel}
            >
                WPM: {modeRsvpStore.wpm}{modeRsvpStore.wpc > 1 ? `×${modeRsvpStore.wpc}` : ""}
            </Button>
        </Popover.Trigger>
        <Popover.Content
            class="w-[300px]"
            onwheel={handleWpmWheel}
        >
            <div
                class="text-center"
                role="status"
            >
                Words per minute
                <span class="text-2xl text-primary font-semibold block">{modeRsvpStore.wpm} </span>
            </div>
            <div
                class="flex items-center justify-between gap-6 mt-4"
                role="group"
            >
                <Button
                    variant="ghost"
                    class="p-1"
                    aria-label="Decrease words per minute"
                    onclick={handleWpmDecrement}
                >
                    <div class="i-hugeicons:minus-sign-circle size-7"></div>
                </Button>

                <Slider
                    value={[modeRsvpStore.wpm]}
                    min={25}
                    max={2000}
                    step={25}
                    onValueChange={(wpm) => (modeRsvpStore.wpm = wpm[0])}
                />

                <Button
                    variant="ghost"
                    class="p-1"
                    aria-label="Increase words per minute"
                    onclick={handleWpmIncrement}
                >
                    <div class="i-hugeicons:plus-sign-circle size-7"></div>
                </Button>
            </div>
        </Popover.Content>
    </Popover.Root>
{/snippet}

{#snippet wpc()}
    <Popover.Root portal={null}>
        <Popover.Trigger
            asChild
            let:builder
        >
            <Button
                builders={[builder]}
                variant="outline"
                size="sm"
                onwheel={handleWpcWheel}
            >
                WPC: {modeRsvpStore.wpc}
            </Button>
        </Popover.Trigger>
        <Popover.Content
            class="w-[300px]"
            onwheel={handleWpcWheel}
        >
            <div
                class="text-center"
                role="status"
            >
                Words per cycle
                <span class="text-2xl text-primary font-semibold block">{modeRsvpStore.wpc} </span>
            </div>
            <div
                class="flex items-center justify-between gap-6 mt-4"
                role="group"
            >
                <Button
                    variant="ghost"
                    class="p-1"
                    aria-label="Decrease words per minute"
                    onclick={handleWpcDecrement}
                >
                    <div class="i-hugeicons:minus-sign-circle size-7"></div>
                </Button>

                <Slider
                    value={[modeRsvpStore.wpc]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(wpc) => (modeRsvpStore.wpc = wpc[0])}
                />

                <Button
                    variant="ghost"
                    class="p-1"
                    aria-label="Increase words per minute"
                    onclick={handleWpcIncrement}
                >
                    <div class="i-hugeicons:plus-sign-circle size-7"></div>
                </Button>
            </div>
        </Popover.Content>
    </Popover.Root>
{/snippet}
