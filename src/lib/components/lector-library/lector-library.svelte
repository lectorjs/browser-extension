<script lang="ts">
    import * as Drawer from "$lib/components/ui/drawer";
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    const { children }: Props = $props();
</script>

<Drawer.Root>
    <Drawer.Trigger>
        {@render children()}
    </Drawer.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Library</Drawer.Title>
            <Drawer.Description>
                Here you can find all your reading material, including the files you have imported and the text you have
                pasted from your clipboard.
            </Drawer.Description>
        </Drawer.Header>
        <Drawer.Footer>
            <Drawer.Close>Cancel</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
