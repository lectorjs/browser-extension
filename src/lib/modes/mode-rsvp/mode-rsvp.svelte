<script lang="ts">
    import { Header } from "$lib/components/layout/header";
    import { NoBuffer } from "$lib/components/no-buffer";
    import { bufferStore } from "$lib/stores/buffer.svelte.ts";
    import { RsvpMode, context } from "@lectorjs/mode-rsvp";
    import parser from "@lectorjs/parser-text";
    import { createReader } from "@lectorjs/primitives";
    import domPurify from "dompurify";
    import { onMount } from "svelte";
    import Controls from "./controls/controls.svelte";
    import Display from "./display/display.svelte";
    import { modeRsvpStore } from "./mode-rsvp.svelte.ts";

    let readerDisplay: HTMLDivElement | undefined = $state();

    const reader = $derived.by(() => {
        const buffer = bufferStore.buffer;

        if (readerDisplay) {
            const r = createReader({
                mode: new RsvpMode(),
                parser: parser(buffer as string),
                renderTo: readerDisplay,
                sanitizer: (html) => domPurify.sanitize(html),
            });

            r.render();

            return r;
        }
    });

    onMount(() => {
        context.subscribe((ctx) => {
            modeRsvpStore.isPlaying = ctx.isPlaying;
            modeRsvpStore.isFinished = ctx.isFinished;

            reader?.render();
        });

        return () => {
            context.destroy();
        };
    });
</script>

<main class="h-full grid grid-rows-[50px_1fr_70px] bg-primary/05">
    <Header />

    {#if bufferStore.buffer}
        <Display>
            <div
                bind:this={readerDisplay}
                class="text-7xl"
            ></div>
        </Display>
    {:else}
        <NoBuffer />
    {/if}

    {#if modeRsvpStore.isInteractive}
        <Controls {reader} />
    {/if}
</main>
