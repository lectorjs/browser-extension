import { browser } from '$app/environment';
import { IdleStore } from '$lib/stores/idle.svelte';

const IDLE_TIME = 1_200;

export class ModeRsvpStore {
    isPlaying = $state(false);
    isFinished = $state(false);
    isIdle = $state(false);
    isHoveringInteractiveUi = $state(false);
    isInteractive = $derived(!this.isIdle || this.isHoveringInteractiveUi || !this.isPlaying || this.isFinished);

    constructor() {
        if (browser) {
            new IdleStore({
                idleTime: IDLE_TIME,
                onIdle: () => {
                    this.isIdle = true;
                },
                onActive: () => {
                    this.isIdle = false;
                },
            });
        }
    }
}

export const modeRsvpStore = new ModeRsvpStore();
