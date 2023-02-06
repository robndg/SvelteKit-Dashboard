import { writable } from 'svelte/store';

export const userDefaults = writable({
    theme: 'dark',
    userName: 'Rob',
    userGithubName: 'robndg',
    defaultCurrency: 'USD' // GBP
});