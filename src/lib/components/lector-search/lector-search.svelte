<script lang="ts">
    import * as Command from "$lib/components/ui/command";
    import type { Word } from "@lectorjs/primitives";
    import type { Snippet } from "svelte";

    type SearchResult = Word & {
        index: number;
    };

    type Props = {
        children: Snippet;
    };

    const { children }: Props = $props();

    let isDialogOpen = $state(false);
    let isLoading = $state(false);
    let searchValue = $state("");
    let searchResults = $state<SearchResult[]>([]);
</script>

<button onclick={() => (isDialogOpen = true)}>
    {@render children()}
</button>

<Command.Dialog bind:open={isDialogOpen}>
    <Command.Input
        bind:value={searchValue}
        placeholder="Type your search query..."
    />
    <Command.List>
        {#if searchValue && !isLoading && searchResults.length > 0}
            <Command.Empty>No results found.</Command.Empty>
        {/if}

        {#if isLoading}
            <Command.Loading
                progress={0.5}
                class="flex justify-center py-6"
            >
                <div class="i-line-md:loading-loop size-6"></div>
            </Command.Loading>
        {:else if searchResults.length > 0}
            <Command.Group>
                {#each searchResults as result}
                    <Command.Item>
                        {result.value}
                    </Command.Item>
                {/each}
            </Command.Group>
        {/if}
    </Command.List>
</Command.Dialog>
