<script lang="ts">
    import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

    type Props = {
        class?: string;
        children: Snippet;
    };

    const { class: className, children }: Props = $props();
</script>

<kbd
    class={cn(
        "bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100",
        className,
    )}
>
    {@render children()}
</kbd>
