import { writable } from 'svelte/store';

export const queryToHighlight = writable<string | null>(null);
