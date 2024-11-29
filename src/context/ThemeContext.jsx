import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Modern theme colors and styles
const themes = {
  light: {
    primary: '#ffffff',
    secondary: '#aaa6c3',
    tertiary: '#f5f5f5',
    text: {
      primary: '#050816',
      secondary: '#4a4a4a',
      accent: '#915eff'
    },
    background: {
      default: '#ffffff',
      paper: '#f8f8f8',
      accent: '#f0f0f0'
    },
    border: '#e0e0e0',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  dark: {
    primary: '#050816',
    secondary: '#aaa6c3',
    tertiary: '#151030',
    text: {
      primary: '#ffffff',
      secondary: '#aaa6c3',
      accent: '#915eff'
    },
    background: {
      default: '#050816',
      paper: '#0a0a1b',
      accent: '#151030'
    },
    border: '#2a2a3a',
    shadow: 'rgba(0, 0, 0, 0.3)'
  }
};

export const ThemeProvider = ({ children }) => {
  // Check if user has a saved preference
  const getSavedTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [isDarkMode, setIsDarkMode] = useState(getSavedTheme() === 'dark');

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    const theme = isDarkMode ? themes.dark : themes.light;

    // Apply CSS variables
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-tertiary', theme.tertiary);
    root.style.setProperty('--text-primary', theme.text.primary);
    root.style.setProperty('--text-secondary', theme.text.secondary);
    root.style.setProperty('--text-accent', theme.text.accent);
    root.style.setProperty('--bg-default', theme.background.default);
    root.style.setProperty('--bg-paper', theme.background.paper);
    root.style.setProperty('--bg-accent', theme.background.accent);
    root.style.setProperty('--border-color', theme.border);
    root.style.setProperty('--shadow-color', theme.shadow);

    // Apply dark mode class
    document.documentElement.classList.toggle('dark', isDarkMode);
    
    // Save preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Update meta theme-color
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme.background.default
    );
  }, [isDarkMode]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme: isDarkMode ? themes.dark : themes.light }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
