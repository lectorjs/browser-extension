import { browser } from '$app/environment';
import { IdleStore } from '$lib/stores/idle.svelte';

const IDLE_TIME = 1_200;

export type ModeRsvpStoreOptions = {
    defaultWpm: number;
    defaultWpc: number;
};

export class ModeRsvpStore {
    isPlaying = $state(false);
    isFinished = $state(false);
    isIdle = $state(false);
    isHoveringInteractiveUi = $state(false);
    isInteractive = $derived(!this.isIdle || this.isHoveringInteractiveUi || !this.isPlaying || this.isFinished);

    #wpm = $state(0);
    #wpc = $state(0);

    set wpm(wpm: number) {
        this.#wpm = Math.min(Math.max(wpm, 25), 2000);
    }

    get wpm() {
        return this.#wpm;
    }

    set wpc(wpc: number) {
        this.#wpc = Math.min(Math.max(wpc, 1), 5);
    }

    get wpc() {
        return this.#wpc;
    }

    constructor(options: ModeRsvpStoreOptions) {
        this.wpm = options.defaultWpm;
        this.wpc = options.defaultWpc;

        if (browser) {
            new IdleStore({
                idleTime: IDLE_TIME,
                onIdle: () => {
                    this.isIdle = true;
                },
                onActive: () => {
                    this.isIdle = false;
                },
            }).start();
        }
    }
}

export const modeRsvpStore = new ModeRsvpStore({
    defaultWpm: 300,
    defaultWpc: 1,
});
