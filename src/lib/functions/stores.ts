import { writable, type Writable } from 'svelte/store';

export let currency: Writable<'euro' | 'yuan'> = writable('euro');
export let exchangeRate: Writable<number> = writable(0);
