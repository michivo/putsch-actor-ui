import { writable } from "svelte/store";

const isBrowser = typeof window !== 'undefined';
const storedNpc = isBrowser ? localStorage.getItem("npc") : '';
export const npc = writable(storedNpc);
npc.subscribe(value => {
    if (isBrowser) {
        localStorage.setItem("npc", value ?? '');
    }
});