<script lang="ts">
    import "@unocss/reset/tailwind.css";
    import "virtual:uno.css";
    import "../app.css";

    const { children } = $props();
</script>

{@render children()}
