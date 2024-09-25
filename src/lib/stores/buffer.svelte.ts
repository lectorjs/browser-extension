export class BufferStore {
    buffer: string | ArrayBuffer | null = $state(null);
}

export const bufferStore = new BufferStore();
