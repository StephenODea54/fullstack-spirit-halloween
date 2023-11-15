// Module Imports
import { useEffect, useState } from 'react';

// Context
import { ThemeProviderContext } from '@/contexts';

// Types
import type { Theme } from '@/types';

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export const ThemeProvider = ({
    children,
    defaultTheme = 'light',
    storageKey = 'theme',
}: ThemeProviderProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };

    return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};
