import { API } from './api.js';

// Elements
const dateFromEl = document.getElementById('filterDateFrom');
const dateToEl = document.getElementById('filterDateTo');
const applyFilterBtn = document.getElementById('applyFilterBtn');
const exportCsvBtn = document.getElementById('exportCsvBtn');

const csvEscape = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
const download = (filename, content, mime = 'text/csv') => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
};

const buildCSV = (headers, rows) => {
    const lines = [headers.map(csvEscape).join(',')];
    rows.forEach(r => {
        const row = headers.map(h => csvEscape(r[h]));
        lines.push(row.join(','));
    });
    return lines.join('\n');
};

const fetchAndApply = async () => {
    try {
        let bills = await API.admin.getAllBills();

        // Apply date filters if present
        const from = dateFromEl && dateFromEl.value ? new Date(dateFromEl.value) : null;
        const to = dateToEl && dateToEl.value ? new Date(dateToEl.value) : null;

        if (from || to) {
            bills = bills.filter(b => {
                const dt = new Date(b.due_date || b.created_at || b.date || null);
                if (!(dt instanceof Date) || isNaN(dt)) return false;
                if (from && dt < from) return false;
                if (to && dt > to) return false;
                return true;
            });
        }

        // Update chart via exposed helper
        if (window.admin && typeof window.admin.updateChart === 'function') {
            window.admin.updateChart(bills);
        }

        // Update totals (basic)
        const totalRevenue = bills.reduce((acc, b) => acc + (parseFloat(b.amount) || 0), 0);
        const totalRevenueEl = document.getElementById('totalRevenue');
        if (totalRevenueEl) totalRevenueEl.textContent = (window && window.CONFIG && window.CONFIG.CURRENCY ? window.CONFIG.CURRENCY : '₹') + totalRevenue.toFixed(2);

    } catch (err) {
        console.error('Error fetching filtered bills:', err);
    }
};

if (applyFilterBtn) applyFilterBtn.addEventListener('click', fetchAndApply);

if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', async () => {
        try {
            let bills = await API.admin.getAllBills();
            const from = dateFromEl && dateFromEl.value ? new Date(dateFromEl.value) : null;
            const to = dateToEl && dateToEl.value ? new Date(dateToEl.value) : null;

            if (from || to) {
                bills = bills.filter(b => {
                    const dt = new Date(b.due_date || b.created_at || b.date || null);
                    if (!(dt instanceof Date) || isNaN(dt)) return false;
                    if (from && dt < from) return false;
                    if (to && dt > to) return false;
                    return true;
                });
            }

            // Aggregate by month
            const map = new Map();
            bills.forEach(b => {
                const dt = new Date(b.due_date || b.created_at || b.date || null);
                const key = (dt instanceof Date && !isNaN(dt)) ? dt.toLocaleString('en-IN', { month: 'short', year: 'numeric' }) : 'Unknown';
                map.set(key, (map.get(key) || 0) + (parseFloat(b.amount) || 0));
            });

            const rows = Array.from(map.entries()).map(([month, revenue]) => ({ Month: month, Revenue: revenue.toFixed(2) }));
            const csv = buildCSV(['Month', 'Revenue'], rows);
            download('dashboard-revenue.csv', csv);

        } catch (err) {
            console.error('Error exporting CSV:', err);
        }
    });
}

// Optionally auto-apply filters on load if inputs exist
if (dateFromEl || dateToEl) {
    // allow page to finish load
    window.addEventListener('load', () => {
        // a little delay to ensure chart is ready
        setTimeout(fetchAndApply, 300);
    });
}
