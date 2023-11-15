// Module Imports
import { createContext } from 'react';

// Types
import type { Theme } from '@/types';

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState>({
    theme: 'light',
    setTheme: () => null,
});
