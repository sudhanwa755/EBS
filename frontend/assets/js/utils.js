import { CONFIG } from './config.js';

export const formatCurrency = (amount) => {
    return `${CONFIG.CURRENCY}${parseFloat(amount).toFixed(2)}`;
};

export const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const formatMonth = (dateString) => {
    if (!dateString) return '';
    // Accept Date, timestamp, or string like '2025-11' or full date
    try {
        let d;
        if (dateString instanceof Date) d = dateString;
        else if (/^\d{4}-\d{1,2}$/.test(String(dateString))) {
            const [y, m] = String(dateString).split('-').map(Number);
            d = new Date(y, m - 1, 1);
        } else {
            d = new Date(dateString);
        }
        if (isNaN(d)) return '';
        return d.toLocaleString('en-IN', { month: 'short', year: 'numeric' });
    } catch (err) {
        return '';
    }
};

export const getTheme = () => {
    return localStorage.getItem(CONFIG.THEME_KEY) || 'light';
};

export const setTheme = (theme) => {
    localStorage.setItem(CONFIG.THEME_KEY, theme);
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

export const toggleTheme = () => {
    const current = getTheme();
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    return next;
};

// Initialize theme on load
setTheme(getTheme());

// Toast / Alert helper
export const showAlert = (message, type = 'info', timeout = 4000) => {
    try {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'}`;
        toast.textContent = message;

        container.appendChild(toast);

        setTimeout(() => {
            try { toast.remove(); } catch (e) { /* ignore */ }
        }, timeout);
    } catch (err) {
        // Fallback: alert
        try { alert(message); } catch (e) { /* ignore */ }
    }
};
