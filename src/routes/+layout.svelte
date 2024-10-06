<script lang="ts">
    import "@unocss/reset/tailwind.css";
    import "virtual:uno.css";
    import "../app.css";

    import { ModeWatcher } from "mode-watcher";

    const { children } = $props();
</script>

<ModeWatcher />

{@render children()}
