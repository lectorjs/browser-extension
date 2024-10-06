<script lang="ts">
    import type { Snippet } from "svelte";

    type Props = {
        children: Snippet;
    };

    let { children }: Props = $props();
</script>

<div class="relative grid place-items-center overflow-hidden">
    {@render children()}
</div>
