<script lang="ts">
    import { context, type RsvpMode } from "@lectorjs/mode-rsvp";
    import type { Reader } from "@lectorjs/primitives";

    type Props = {
        reader: Reader<RsvpMode> | undefined;
    };

    let { reader }: Props = $props();

    const CHAPTERS = ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4", "Chapter 5"]; // TODO: make this dynamic

    let snapshotElement = $state<HTMLElement>();
    let progressElement = $state<HTMLElement>();

    let snapshotVisible = $state(false);
    let snapshotPosition = $state(0);
    let snapshot = $state({
        nodeId: 0,
        page: 0,
        text: {
            preceding: "",
            current: "",
            following: "",
        },
    });

    let isDragging = $state(false);

    let currentProgress = $state(0);
    let currentValue = $state("");

    context.subscribe((context) => {
        currentProgress = context.currentProgress();
        currentValue = context.currentValue();
    });
</script>

<!-- <svelte:window
	onmousedown="{handlePress}"
	ontouchstart="{handlePress}"
	onmousemove="{handleMove}"
	ontouchmove="{handleMove}"
	onmouseup="{handleRelease}"
	ontouchend="{handleRelease}"
/> -->

<div class="relative w-full h-4">
    <!-- {#if snapshotVisible}
		{@render snapshotFragment()}
	{/if} -->

    {@render progressFragment()}
</div>

{#snippet progressFragment()}
    <div
        bind:this={progressElement}
        role="progressbar"
        class="relative flex w-full h-full items-center gap-0.5 overflow-hidden bg-accent/10 select-none"
    >
        <!-- chapters -->
        <div class="absolute inset-y-0 w-full h-full grid grid-flow-col gap-1 pointer-events-none">
            {#each CHAPTERS as chapter}
                <div
                    role="presentation"
                    class="flex-1 grid place-items-center text-[10px] font-500 bg-accent leading-none whitespace-nowrap"
                >
                    {chapter}
                </div>
            {/each}
        </div>

        <!-- slider -->
        <div
            class="absolute inset-y-0 h-full bg-primary/20 flex items-center justify-end"
            style="width: {currentProgress}%"
        >
            <span
                role="slider"
                class="w-5 h-full bg-foreground"
                aria-label="Slider control for reading progress"
                aria-valuetext={currentValue}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={currentProgress}
                tabindex="0"
            ></span>
        </div>
    </div>
{/snippet}
