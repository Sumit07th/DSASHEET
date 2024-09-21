import { atom } from 'recoil';

export const themeState = atom({
    key: 'themeState',
    default: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light', // Get from localStorage or default to light
});
