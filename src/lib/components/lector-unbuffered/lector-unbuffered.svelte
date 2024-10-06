<script lang="ts">
    import { Kbd } from "$lib/components/kbd";
    import { LectorLibrary } from "$lib/components/lector-library";
    import * as Alert from "$lib/components/ui/alert";
    import { Button } from "$lib/components/ui/button";
    import * as Tooltip from "$lib/components/ui/tooltip";
    import { getRandomStory } from "$lib/literature";
    import { bufferStore } from "$lib/stores/buffer.svelte";

    function handleFeelLucky() {
        const story = getRandomStory();
        bufferStore.buffer = story;
    }

    function handlePasteFromClipboard() {
        navigator.clipboard
            .readText()
            .then((text) => {
                if (!text.trim()) {
                    return;
                }

                bufferStore.buffer = text;
            })
            .catch(console.error);
    }
</script>

<svelte:window onpaste={handlePasteFromClipboard} />

<section class="container grid place-items-center">
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
            Import a new document using the Lector library, randomly select a story from our collection using the "I
            feel Lucky" option, or paste your own text from the clipboard.
        </p>

        <Alert.Root class="mt-6">
            <Alert.Title>Data privacy and storage notice</Alert.Title>
            <Alert.Description>
                <div class="mt-4">
                    <h3 class="text-xs font-semibold mb-2">Privacy and security</h3>
                    <p>
                        All of your data is stored locally in your browser, ensuring it never leaves your device. No
                        telemetry, tracking, or data transmission occurs to any external server.
                    </p>
                </div>

                <div class="mt-4">
                    <h3 class="text-xs font-semibold mb-2">Storage and file retention</h3>
                    <p>
                        Uploaded files are stored in your browser's local storage, specifically <Button
                            variant="link"
                            href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
                            target="_blank"
                            rel="noopener noreferrer">IndexedDB</Button
                        >. However, these files may be lost under the following circumstances:
                    </p>
                    <ul class="mt-2 pl-8 list-disc">
                        <li>Clearing your browser's IndexedDB storage.</li>
                        <li>Uninstalling or resetting your browser.</li>
                        <li>Uninstalling Lector browser extension.</li>
                        <li>Using private or incognito mode, which often deletes data upon session close.</li>
                    </ul>
                    <p class="mt-2">
                        To avoid potential data loss, it's recommend to back up your library when needed to a secure
                        location.
                    </p>
                </div>
            </Alert.Description>
        </Alert.Root>

        <div class="flex flex-col gap-2 mt-6 sm:(flex-row items-center)">
            <LectorLibrary>
                <Button>
                    <div class="i-solar:library-line-duotone size-5"></div>
                    Library
                </Button>
            </LectorLibrary>
            <Tooltip.Root openDelay={200}>
                <Tooltip.Trigger
                    asChild
                    let:builder
                >
                    <Button
                        builders={[builder]}
                        variant="secondary"
                        onclick={handleFeelLucky}
                    >
                        <div class="i-solar:file-smile-outline size-5"></div>
                        I feel lucky
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>Read a random story to test Lector's functionality</p>
                </Tooltip.Content>
            </Tooltip.Root>
            <Tooltip.Root openDelay={200}>
                <Tooltip.Trigger
                    asChild
                    let:builder
                >
                    <Button
                        builders={[builder]}
                        variant="ghost"
                        onclick={handlePasteFromClipboard}
                    >
                        <div class="i-solar:clipboard-check-linear size-5"></div>
                        <Kbd class="ml-2">Ctrl v</Kbd>
                    </Button>
                </Tooltip.Trigger>
                <Tooltip.Content>
                    <p>Paste from clipboard</p>
                </Tooltip.Content>
            </Tooltip.Root>
        </div>
    </div>
</section>
