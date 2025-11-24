# ⚡ ElectroBill - Electricity Billing System

A modern, full-featured electricity billing management system designed for both customers and administrators. Built with vanilla JavaScript and powered by Supabase for real-time data management.

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

### Customer Portal
- **User Authentication** – Secure email/password authentication via Supabase Auth  
- **Auto-Generated Meter Numbers** – Unique meter numbers in `MTR-XXXXXX` format  
- **Dashboard** – Real-time consumption overview, pending bills & analytics  
- **Bill Management** – View/filter/search bills + PDF download  
- **Profile Management** – Update personal info and address  
- **Payment Processing** – Online bill payment with full tracking  
- **Dark Mode** – Toggle between light and dark theme  

### Admin Portal
- **Admin Dashboard** – Revenue, consumption & user analytics  
- **User Management** – View/search/manage all registered users  
- **Bill Management** – Create, update & delete bills  
- **Meter Reading Entry** – Add meter readings with auto-billing  
- **Tariff Management** – Define tier-based pricing plans  
- **Reports & Analytics** – Export CSV/PDF revenue & activity reports  

---

## 🚀 Tech Stack

### Frontend
- HTML5  
- Tailwind CSS (CDN)  
- Vanilla JavaScript (ES6 Modules)  
- html2pdf.js  

### Backend & Database
- Supabase  
- PostgreSQL  
- Supabase Auth  
- Row-Level Security (RLS)

### Libraries & Services
- @supabase/supabase-js  
- Google Fonts  

---

## 📋 Database Schema (8 Core Tables)

| Table | Description |
|-------|-------------|
| `profiles` | User profile & role (USER / ADMIN) |
| `customer_info` | Customer details & meter info |
| `bills` | Electricity bills & status |
| `consumption` | Meter reading history |
| `tariff_plans` | Tier-based pricing plans |
| `customer_tariff_mapping` | User-tariff assignment history |
| `consumption_limits` | Custom usage alert thresholds |
| `consumption_alerts` | Alert/audit log |

🔒 RLS, triggers, foreign keys with cascade delete & indexes included.

---

## 🛠 Installation & Setup

### Prerequisites
| Requirement | Status |
|------------|--------|
| Supabase account | ✔ |
| Local HTTP server | ✔ |
| Modern browser | ✔ |

---

### Step 1 — Clone the Repository
```bash
git clone https://github.com/sudhanwa755/EBS.git
cd EBS

````

### Step 2 — Supabase Setup

1. Create a new project
2. Get your **Project URL** & **anon/public API Key**
3. Run `clean-setup-FIXED.sql` in the SQL editor
4. Verify all 8 tables exist in Table Editor

### Step 3 — Configure Credentials

Edit:

```
frontend/assets/js/config.js
```

```javascript
export const CONFIG = {
    SUPABASE_URL: 'YOUR_PROJECT_URL_HERE',
    SUPABASE_ANON_KEY: 'YOUR_ANON_KEY_HERE'
};
```

### Step 4 — Run the Application

| Method              | Command / Action                                          |
| ------------------- | --------------------------------------------------------- |
| VS Code Live Server | Right-click `frontend/index.html` → Open with Live Server |
| Python HTTP Server  | `cd frontend && python -m http.server 8000`               |
| npx http-server     | `cd frontend && npx http-server`                          |

---

## 👤 Default Credentials

To set first admin:

```sql
UPDATE profiles SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

Newly registered users automatically receive:

* Unique meter number
* USER role
* Active account status

---

## 📁 Project Structure

```
EBS/
├── clean-setup-FIXED.sql
├── PROJECT_INFO.txt
├── README.md
└── frontend/
    ├── index.html
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── my-bills.html
    ├── payment.html
    ├── profile.html
    ├── admin/
    │   ├── dashboard.html
    │   ├── manage-users.html
    │   ├── bills.html
    │   ├── add-reading.html
    │   ├── tariffs.html
    │   └── reports.html
    └── assets/
        ├── css/main.css
        └── js/
            ├── config.js
            ├── supabase.js
            ├── auth.js
            ├── api.js
            ├── utils.js
            ├── dashboard.js
            ├── bills.js
            ├── profile.js
            ├── payment.js
            ├── admin.js
            ├── admin-users.js
            ├── admin-bills.js
            ├── admin-add-reading.js
            ├── admin-tariffs.js
            ├── admin-reports.js
            └── admin-analytics.js
```

---

## 🔑 Key Implementation Highlights

| Feature                        | Status |
| ------------------------------ | ------ |
| Auto-generated meter numbers   | ✔      |
| Tier-based bill calculation    | ✔      |
| Real PDF bills (NO dummy data) | ✔      |
| Full RLS with admin bypass     | ✔      |
| Analytics + CSV/PDF export     | ✔      |

---

## 🐛 Troubleshooting

| Issue                    | Fix                                               |
| ------------------------ | ------------------------------------------------- |
| 500 error on admin login | Re-run SQL to ensure `is_admin()` function exists |
| Meter number not showing | Check `customer_info` insertion on registration   |
| PDF showing dummy data   | Make sure profile address details are filled      |
| Bill amount incorrect    | Verify active tariff plan exists                  |

---

## 🤝 Contributing

1. Fork repo
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m "Add AmazingFeature"`
4. Push: `git push origin feature/AmazingFeature`
5. Open PR

---

## 📝 License
This project is licensed under the MIT License — see the LICENSE file for details.

## 📧 Contact

For queries, support, or collaboration:

- 📩 Email: **sudhanwalatur@gmail.com**
- 🐛 GitHub Issues: https://github.com/sudhanwa755/EBS/issues

## 🙏 Acknowledgments

  - Supabase — Backend infrastructure  
  - Tailwind CSS — CSS Framework  
  - html2pdf.js — PDF generation  
  - Google Fonts — Typography

---

**Built with ❤️ using Vanilla JavaScript and Supabase**
