<script lang="ts">
    import { Kbd } from "$lib/components/kbd";
    import { Button } from "$lib/components/ui/button";
    import { bufferStore } from "$lib/stores/buffer.svelte";
    import { onMount } from "svelte";

    function handlePasteFromClipboard() {
        navigator.clipboard
            .readText()
            .then((text) => {
                bufferStore.buffer = text;
            })
            .catch(console.error);
    }

    onMount(() => {
        window.addEventListener("paste", handlePasteFromClipboard);

        return () => {
            window.removeEventListener("paste", handlePasteFromClipboard);
        };
    });
</script>

<section class="grid place-items-center">
    <div class="max-w-xl">
        <div class="flex">
            <img
                src="https://cdn.prod.website-files.com/5e51c674258ffe10d286d30a/5e5358a764109d50aa01705d_peep-60.svg"
                alt=""
                class="w-30"
            />
        </div>

        <h1 class="text-2xl font-semibold">Get started</h1>

        <p class="text-muted-foreground mt-4">
            Begin by importing your reading material into Lector using the buttons below. You can easily import text
            from various sources including PDF files, ePUB books, Markdown documents, and even URLs from websites.
            Additionally, you can paste text from your clipboard.
        </p>

        <div class="flex items-center gap-2 mt-6">
            <Button size="lg">
                <div class="i-carbon:document-add size-4"></div>
                Import
            </Button>
            <Button
                variant="outline"
                size="lg"
                onclick={handlePasteFromClipboard}
            >
                Paste from Clipboard
                <Kbd class="ml-2">Ctrl v</Kbd>
            </Button>
        </div>
    </div>
</section>
