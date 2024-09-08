import { selector } from 'recoil';
import { authState } from '../atoms/authAtoms.js';

export const isAuthenticated = selector({
    key: 'isAuthenticated',
    get: ({ get }) => {
        const auth = get(authState);
        return auth.isLoggedIn;
    },
});

export const currentUser = selector({
    key: 'currentUser',
    get: ({ get }) => {
        const auth = get(authState);
        return auth.user;
    },
});
