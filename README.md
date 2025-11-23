# ⚡ ElectroBill - Electricity Billing System

A modern, full-featured electricity billing management system designed for both customers and administrators. Built with vanilla JavaScript and powered by Supabase for real-time data management.

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

### Customer Portal
- **User Authentication** - Secure email/password authentication via Supabase Auth
- **Auto-Generated Meter Numbers** - Unique meter numbers in MTR-XXXXXX format
- **Dashboard** - Real-time consumption overview, pending bills, and consumption charts
- **Bill Management** - View, filter, and search bills with PDF download capability
- **Profile Management** - Update personal information, contact details, and address
- **Payment Processing** - Online bill payment with payment history tracking
- **Dark Mode** - Toggle between light and dark themes

### Admin Portal
- **Admin Dashboard** - System-wide analytics, revenue statistics, and user metrics
- **User Management** - View, search, and manage all registered users
- **Bill Management** - Create, update, and delete customer bills
- **Meter Reading Entry** - Add meter readings with automatic bill generation
- **Tariff Management** - Create and manage tiered pricing plans
- **Reports & Analytics** - Generate revenue, outstanding bills, and user activity reports with CSV/PDF export

## 🚀 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript modules
- **html2pdf.js** - PDF generation from HTML

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
- **PostgreSQL** - Relational database
- **Supabase Auth** - Authentication and authorization
- **Row-Level Security (RLS)** - Data access control

### Libraries & Services
- **@supabase/supabase-js** - Supabase JavaScript client
- **Google Fonts** - Inter and Poppins fonts

## 📋 Database Schema

The system uses 8 core PostgreSQL tables:

| Table | Purpose |
|-------|---------|
| `profiles` | User account information with roles (USER/ADMIN) |
| `customer_info` | Extended customer details, meter & connection info |
| `bills` | Electricity bills with status tracking |
| `consumption` | Meter reading records and consumption tracking |
| `tariff_plans` | Tiered electricity rate plans |
| `customer_tariff_mapping` | Customer-tariff assignments over time |
| `consumption_limits` | User-defined consumption alerts |
| `consumption_alerts` | Audit trail for consumption limit alerts |

### Key Features
- ✅ Row-Level Security (RLS) on all tables
- ✅ Automatic timestamps via triggers
- ✅ Foreign key constraints with CASCADE delete
- ✅ Unique constraints (email, meter_number)
- ✅ CHECK constraints for data validation
- ✅ Performance-optimized indexes

## 🛠️ Installation & Setup

### Prerequisites
- A Supabase account (free tier works)
- A local web server (Live Server, Python HTTP server, etc.)
- Modern web browser

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/electricity-billing-system.git
cd electricity-billing-system
```

### Step 2: Supabase Setup

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up and create a new project
   - Wait for the project to be ready

2. **Get Your Credentials**
   - Navigate to Project Settings → API
   - Copy the **Project URL**
   - Copy the **anon/public** API Key

3. **Setup Database**
   - Open the SQL Editor in Supabase
   - Copy the entire contents of `clean-setup-FIXED.sql`
   - Paste into the SQL Editor and click **Run**
   - Wait for "Setup Complete!" message

4. **Verify Tables**
   - Go to Table Editor
   - Confirm all 8 tables are created: `profiles`, `customer_info`, `bills`, `consumption`, `tariff_plans`, `customer_tariff_mapping`, `consumption_limits`, `consumption_alerts`

### Step 3: Configure Application

1. Open `frontend/assets/js/config.js`
2. Update with your Supabase credentials:

```javascript
export const CONFIG = {
    SUPABASE_URL: 'YOUR_PROJECT_URL_HERE',
    SUPABASE_ANON_KEY: 'YOUR_ANON_KEY_HERE'
};
```

3. Save the file

### Step 4: Run the Application

**Option A: Using VS Code Live Server**
1. Install the "Live Server" extension
2. Right-click on `frontend/index.html`
3. Select "Open with Live Server"
4. Application opens at `http://127.0.0.1:5500/frontend/`

**Option B: Using Python HTTP Server**
```bash
cd frontend
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser

**Option C: Using npx http-server**
```bash
cd frontend
npx http-server
```

## 👤 Default Credentials

### Create Admin User
After setting up the database, create an admin user by running this SQL in Supabase:

```sql
-- First register a user through the app, then run:
UPDATE profiles SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

### Test Users
Register new users through the application's registration page. Each user will receive:
- Auto-generated meter number (MTR-000001, MTR-000002, etc.)
- Default USER role
- Active account status

## 📁 Project Structure

```
EBS/
├── clean-setup-FIXED.sql           # Complete database schema
├── PROJECT_INFO.txt                # Detailed project documentation
├── README.md                       # This file
│
└── frontend/                       # Web application
    ├── index.html                  # Landing page
    ├── login.html                  # Login page
    ├── register.html               # Registration with meter number modal
    ├── dashboard.html              # User dashboard
    ├── my-bills.html               # Bills list with PDF download
    ├── payment.html                # Payment processing
    ├── profile.html                # Profile management
    │
    ├── admin/                      # Admin portal
    │   ├── dashboard.html          # Admin dashboard
    │   ├── manage-users.html       # User management
    │   ├── bills.html              # Bill management
    │   ├── add-reading.html        # Meter reading entry
    │   ├── tariffs.html            # Tariff management
    │   └── reports.html            # Reports & analytics
    │
    └── assets/                     # Static assets
        ├── css/
        │   └── main.css            # Global styles
        └── js/                     # JavaScript modules
            ├── config.js           # Supabase configuration
            ├── supabase.js         # Supabase client
            ├── auth.js             # Authentication logic
            ├── api.js              # Database operations
            ├── utils.js            # Utility functions
            ├── dashboard.js        # Dashboard logic
            ├── bills.js            # Bills & PDF generation
            ├── profile.js          # Profile management
            ├── payment.js          # Payment processing
            ├── admin.js            # Admin common logic
            ├── admin-users.js      # User management
            ├── admin-bills.js      # Admin bill management
            ├── admin-add-reading.js # Meter reading entry
            ├── admin-tariffs.js    # Tariff management
            ├── admin-reports.js    # Report generation
            └── admin-analytics.js  # Analytics calculations
```

## 🔑 Key Implementation Details

### Auto-Generated Meter Numbers
- Format: `MTR-XXXXXX` (zero-padded 6 digits)
- Auto-incremented from highest existing number
- Stored in `customer_info.meter_number` with UNIQUE constraint
- Displayed in success modal after registration
- Maximum capacity: 999,999 customers

### Tiered Bill Calculation
The system uses a three-tier pricing structure:
- **Tier 1**: 0-100 units at configurable rate
- **Tier 2**: 101-300 units at configurable rate
- **Tier 3**: 300+ units at configurable rate
- Plus base fee (fixed monthly charge)

Example calculation for 250 kWh:
```
Base fee: ₹50
Tier 1 (0-100): 100 × ₹5.00 = ₹500
Tier 2 (101-300): 150 × ₹7.50 = ₹1,125
Total: ₹50 + ₹500 + ₹1,125 = ₹1,675
```

### PDF Bill Generation
- Uses real customer data (NO dummy data)
- Includes: name, address, meter number, bill details
- Professional formatting with company branding
- Downloads as `bill-{billId}.pdf`
- Generated using html2pdf.js library

### Row-Level Security (RLS)
- All tables protected with RLS policies
- Users can only access their own data
- Admins have full access via `is_admin()` SECURITY DEFINER function
- Prevents infinite recursion errors

## 🔒 Security Features

- ✅ Supabase Authentication with email verification
- ✅ Row-Level Security (RLS) on all database tables
- ✅ Role-based access control (USER/ADMIN)
- ✅ SECURITY DEFINER functions to prevent RLS recursion
- ✅ Input validation and sanitization
- ✅ Secure password handling via Supabase Auth
- ✅ Protected admin routes

## 📊 Reports & Analytics

The admin portal includes comprehensive reporting:

1. **Revenue Reports** - Monthly revenue, units consumed, fixed charges (CSV/PDF export)
2. **Outstanding Bills** - All pending bills with customer details (CSV/PDF export)
3. **User Activity** - All registered users with account status (CSV/PDF export)
4. **Consumption History** - Complete meter reading history (CSV/PDF export)

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Dark mode support
- Professional color scheme
- Smooth animations and transitions
- Loading states and error handling
- Toast notifications for user feedback
- Modal dialogs for confirmations

## 🐛 Troubleshooting

### Common Issues

**Issue: 500 Internal Server Error on admin login**
- **Solution**: Ensure the `is_admin()` SECURITY DEFINER function is created. Run `clean-setup-FIXED.sql` again.

**Issue: Meter number not showing after registration**
- **Solution**: Check that `customer_info` table exists and the registration flow creates an entry.

**Issue: PDF download shows dummy data**
- **Solution**: Ensure customer profile is complete with address information in `customer_info` table.

**Issue: Bills not calculating correctly**
- **Solution**: Verify an active tariff plan exists in `tariff_plans` table with proper tier rates.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) - PDF generation
- [Google Fonts](https://fonts.google.com) - Typography

---

**Built with ❤️ using Vanilla JavaScript and Supabase**
