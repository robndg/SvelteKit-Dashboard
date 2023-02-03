import { writable } from 'svelte/store';

export const userBalances = writable({
    cryptoFull: 'bitcoin',
    walletBalance: 0.3
});