<script lang="ts">
    import { type ButtonProps, buttonVariants } from "$lib/components/ui/button/index.ts";
    import { cn } from "$lib/utils.js";
    import type { Snippet } from "svelte";
    import type { HTMLAnchorAttributes } from "svelte/elements";
    import { cleanDoubleSlashes } from "ufo";

    type CommonProps = {
        href: string;
        isBlank?: boolean;
        class?: string;
        children: Snippet<[{ isExternal: boolean }]>;
    };

    type LinkProps = {
        isButton?: false;
    };

    type LinkButtonProps = {
        isButton?: true;
        variant?: ButtonProps["variant"];
        size?: ButtonProps["size"];
    };

    type Props = CommonProps & HTMLAnchorAttributes & (LinkProps | LinkButtonProps);

    const props: Props = $props();
    const { href, isBlank, isButton, class: className, children, ...restProps } = props;

    const isDisabled = $derived(!href);
    const isExternal = $derived(href?.includes("://"));
    const target = $derived(isBlank ? "_blank" : undefined);
    const rel = $derived(isExternal ? "noopener noreferrer" : "");
    const tabindex = $derived(isDisabled ? -1 : undefined);
    const ariaLabel = $derived(isBlank ? `Navigate to ${href} in a new tab` : `Navigate to ${href}`);
    const baseClass = $derived(
        isButton
            ? buttonVariants({ variant: props.variant, size: props.size ?? "default" })
            : "underline hover:text-foreground/80",
    );
</script>

<a
    class={cn(baseClass, className)}
    href={cleanDoubleSlashes(href)}
    {target}
    {rel}
    {tabindex}
    aria-label={ariaLabel}
    aria-disabled={isDisabled}
    {...restProps}
>
    {@render children({ isExternal })}
</a>
