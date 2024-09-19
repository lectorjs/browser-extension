<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { RsvpMode, context } from "@lectorjs/mode-rsvp";
    import parser from "@lectorjs/parser-text";
    import { createReader, type Reader } from "@lectorjs/primitives";
    import domPurify from "dompurify";
    import { onMount } from "svelte";

    let readerDisplay: HTMLDivElement;

    let reader: Reader<RsvpMode>;

    onMount(() => {
        reader = createReader({
            mode: new RsvpMode(),
            parser: parser("This is a dummy text to test the txt parser. 😾"),
            renderTo: readerDisplay,
            sanitizer: (html) => domPurify.sanitize(html),
        });

        reader.render();
    });
</script>

<section class="h-full grid grid-rows-[1fr_60px]">
    {@render display()}
    {#if reader}
        {@render actions()}
    {/if}
</section>

{#snippet display()}
    <div class="grid place-items-center">
        <div
            bind:this={readerDisplay}
            class="text-6xl"
        ></div>
    </div>
{/snippet}

{#snippet actions()}
    <div class="grid grid-cols-3 items-center gap-4 px-4 bg-accent">
        {@render actionsLeft()}
        {@render actionsCenter()}
        {@render actionsRight()}
    </div>
{/snippet}

{#snippet actionsLeft()}
    <div class="flex items-center gap-2 justify-start">
        <Button
            variant="ghost"
            onclick={() => reader?.executeCommand("restart")}
        >
            Restart
        </Button>
        <Button
            variant="ghost"
            onclick={() => reader?.executeCommand("finish")}
        >
            Finish
        </Button>
    </div>
{/snippet}

{#snippet actionsCenter()}
    <div class="flex items-center gap-2 justify-center">
        <Button
            variant="ghost"
            onclick={() => reader?.executeCommand("prev")}
        >
            <div class="i-carbon:skip-back size-5"></div>
        </Button>
        <Button
            variant="ghost"
            onclick={() => reader?.executeCommand("toggle")}
        >
            {#if context.get().isPlaying}
                <div class="i-carbon:pause size-5"></div>
            {:else}
                <div class="i-carbon:play size-5"></div>
            {/if}
        </Button>
        <Button
            variant="ghost"
            onclick={() => reader?.executeCommand("next")}
        >
            <div class="i-carbon:skip-forward size-5"></div>
        </Button>
    </div>
{/snippet}

{#snippet actionsRight()}
    <div class="flex items-center gap-2 justify-end">
        <Button variant="ghost">
            <div class="i-carbon:playlist size-5"></div>
        </Button>
    </div>
{/snippet}
