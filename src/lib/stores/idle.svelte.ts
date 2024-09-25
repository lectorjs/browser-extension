const IDLE_EVENTS = [
    'mousemove',
    'mousedown',
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel',
    'wheel',
    'scroll',
    'keydown',
] as const;

export type IdleStoreOptions = {
    idleTime: number;
    onIdle?: (() => void) | undefined;
    onActive?: (() => void) | undefined;
};

export class IdleStore {
    #options: IdleStoreOptions;

    #timer: NodeJS.Timer | null = null;

    #isIdle = $state(false);

    constructor(options: IdleStoreOptions) {
        this.#options = options;
    }

    start() {
        this.#addEventListeners();
        this.#resetTimer();
    }

    end() {
        if (this.#timer) {
            clearTimeout(this.#timer);
        }

        this.#removeEventListeners();
    }

    #handleActivity() {
        if (this.#isIdle) {
            this.#isIdle = false;
            this.#options.onActive?.();
        }

        this.#resetTimer();
    }

    #resetTimer() {
        if (this.#timer) {
            clearTimeout(this.#timer);
        }

        this.#timer = setTimeout(() => {
            this.#isIdle = true;
            this.#options.onIdle?.();
        }, this.#options.idleTime);
    }

    #addEventListeners() {
        for (const event of IDLE_EVENTS) {
            document.addEventListener(event, this.#handleActivity, { passive: true });
        }
    }

    #removeEventListeners() {
        for (const event of IDLE_EVENTS) {
            document.removeEventListener(event, this.#handleActivity);
        }
    }
}
