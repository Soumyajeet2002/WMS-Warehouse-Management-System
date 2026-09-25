# Warehouse Management System (WMS)

## Project Master Specification & Development Blueprint

**Version:** 1.0  
**Status:** Planning / Pre-development  
**Target OS:** Windows  
**Frontend:** React + JavaScript + CSS  
**Backend:** NestJS + TypeORM  
**Database:** PostgreSQL  
**API:** REST initially, WebSocket for real-time updates later

---

# 1. Project Overview

This project is a single web application for managing warehouse and vendor operations.

The system will provide a centralized view of:

- Vendors
- Products
- Categories
- Warehouses
- Stock and inventory
- Stock movements
- Orders
- Purchases
- Sales
- Expenses
- Profit & Loss
- Employees
- Employee activities
- Reports
- Dashboard metrics
- Audit history
- Notifications
- Administrative controls

The application will initially have only two roles:

1. `ADMIN`
2. `VENDOR`

The same React application will be used by both roles. Access to screens and data will be controlled by authentication and authorization.

---

# 2. Primary Goals

The WMS should:

1. Maintain accurate inventory.
2. Track every important stock movement.
3. Allow vendors to manage their own business data.
4. Allow the admin to monitor all vendors.
5. Track orders from creation through delivery/cancellation.
6. Track purchases and stock received.
7. Track sales and revenue.
8. Track business expenses.
9. Calculate operational Profit & Loss.
10. Track employees and their daily activities.
11. Provide dashboard-based business visibility.
12. Support immediate UI updates after data entry.
13. Maintain an audit trail for important actions.
14. Prevent one vendor from accessing another vendor's data.
15. Be designed for future growth and real-time functionality.

---

# 3. Technology Stack

## Frontend

- React
- JavaScript
- CSS
- React Router
- HTTP client for API communication
- Charting library for dashboard/report charts

## Backend

- NestJS
- TypeScript
- TypeORM
- REST API
- JWT authentication
- Role-based authorization
- WebSocket support later

## Database

- PostgreSQL

## Development Environment

- Windows
- Node.js
- npm
- Git
- GitHub or another Git hosting provider

---

# 4. High-Level Architecture

```text
                         ┌─────────────────────┐
                         │        USER         │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     React App       │
                         │                     │
                         │ Admin UI            │
                         │ Vendor UI           │
                         │ Dashboard           │
                         │ Inventory           │
                         │ Orders              │
                         │ Finance             │
                         └──────────┬──────────┘
                                    │
                              HTTP / JSON
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │      NestJS API     │
                         │                     │
                         │ Auth                │
                         │ Vendors             │
                         │ Products            │
                         │ Inventory            │
                         │ Orders              │
                         │ Purchases            │
                         │ Sales               │
                         │ Employees           │
                         │ Finance             │
                         │ Reports             │
                         └──────────┬──────────┘
                                    │
                                 TypeORM
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     PostgreSQL      │
                         └─────────────────────┘
```

Future real-time layer:

```text
React
  ▲
  │ WebSocket
  │
NestJS
  │
  ▼
PostgreSQL
```

---

# 5. User Roles

## 5.1 ADMIN

The admin has global access.

Admin responsibilities:

- Manage vendors
- View all vendors
- View all products
- View all warehouses
- View all inventory
- View all orders
- View purchases
- View sales
- View expenses
- View Profit & Loss
- View employees
- View reports
- View system activity
- Manage system settings

The admin can see aggregated business information across vendors.

---

## 5.2 VENDOR

A vendor can manage only their own business data.

Vendor responsibilities:

- Manage products
- Manage categories
- Manage warehouses
- Manage inventory
- Receive stock
- Adjust stock
- Manage orders
- Manage purchases
- View sales
- Manage expenses
- View Profit & Loss
- Manage employees
- Record employee activities
- View reports

A vendor must never be able to access another vendor's business data.

---

# 6. Important Security Principle

The backend must never trust a `vendorId` supplied by the frontend for authorization.

Incorrect approach:

```text
Frontend sends:

{
  "vendorId": 10,
  "productName": "Rice"
}
```

and the backend blindly saves the record.

Correct approach:

```text
JWT
  ↓
Authenticated User
  ↓
User Role
  ↓
User's Vendor ID
  ↓
Backend determines ownership
  ↓
Database operation
```

The authenticated user's identity must determine which vendor's data can be accessed.

---

# 7. Core Business Principle: Transaction-Based Inventory

Inventory must not be treated as a manually editable number everywhere.

Every important stock change should create an inventory transaction.

Examples:

```text
OPENING_STOCK
PURCHASE
SALE
ORDER_RESERVATION
ORDER_RELEASE
TRANSFER_IN
TRANSFER_OUT
RETURN
DAMAGE
ADJUSTMENT
```

Conceptually:

```text
Opening Stock
+ Purchases
+ Transfers In
+ Returns
- Sales
- Transfers Out
- Damage
± Adjustments
= Current Stock
```

This transaction-based approach provides:

- Accurate inventory
- Stock history
- Auditability
- Easier debugging
- Better reporting
- Better reconciliation

---

# 8. Main Business Flow

## 8.1 Product Creation

```text
Vendor
  ↓
Create Category
  ↓
Create Product
  ↓
Assign SKU
  ↓
Set Purchase Price
  ↓
Set Selling Price
  ↓
Set Minimum Stock
  ↓
Save Product
```

---

## 8.2 Stock Receiving

```text
Vendor receives goods
        ↓
Purchase / Receiving record
        ↓
Purchase items
        ↓
Inventory transaction (+)
        ↓
Inventory quantity increases
        ↓
Dashboard reflects new stock
```

Example:

```text
Existing stock = 1,000 KG
Received       =   500 KG
-------------------------
New stock      = 1,500 KG
```

---

## 8.3 Order Flow

```text
Customer Order
      ↓
Order Created
      ↓
Stock Availability Check
      ↓
Stock Reserved
      ↓
Order Confirmed
      ↓
Processing
      ↓
Ready
      ↓
Dispatched
      ↓
Delivered
      ↓
Sale / Revenue Recorded
```

Possible order statuses:

```text
PENDING
CONFIRMED
PROCESSING
READY
DISPATCHED
DELIVERED
CANCELLED
```

---

# 9. Stock Reservation

Physical stock and available stock must be treated separately.

Example:

```text
Physical Stock      = 1,000
Reserved Stock      =   200
Available Stock     =   800
```

Formula:

```text
Available Stock =
Physical Stock - Reserved Stock
```

When an order is created and reserved:

```text
Physical Stock = 1,000
Reserved       = 200
Available      = 800
```

When the order is dispatched:

```text
Physical Stock = 800
Reserved       = 0
Available      = 800
```

This prevents overselling.

---

# 10. Main Modules

The planned application modules are:

```text
1. Authentication
2. Users
3. Vendors
4. Dashboard
5. Products
6. Categories
7. Warehouses
8. Inventory
9. Inventory Transactions
10. Orders
11. Purchases
12. Sales
13. Expenses
14. Employees
15. Employee Activities
16. Finance
17. Reports
18. Notifications
19. Audit Logs
20. System Settings
```

---

# 11. Database Design

The database will be relational and PostgreSQL-based.

Initial core entities:

```text
users
vendors
categories
products
warehouses
inventory
inventory_transactions
```

Later entities:

```text
orders
order_items
purchases
purchase_items
sales
expenses
employees
employee_activities
finance_transactions
audit_logs
notifications
```

---

# 12. Users Table

Purpose:

Store application login and identity information.

Suggested fields:

```text
users

id
vendor_id
name
email
password_hash
role
is_active
last_login_at
created_at
updated_at
```

Roles:

```text
ADMIN
VENDOR
```

Admin:

```text
vendor_id = NULL
role = ADMIN
```

Vendor:

```text
vendor_id = vendor's ID
role = VENDOR
```

---

# 13. Vendors Table

```text
vendors

id
name
business_name
email
phone
address
tax_number
status
created_at
updated_at
```

Possible status:

```text
ACTIVE
INACTIVE
SUSPENDED
```

---

# 14. Categories Table

```text
categories

id
vendor_id
name
description
is_active
created_at
updated_at
```

Examples:

```text
Rice
Oil
Sugar
Wheat
Electronics
Hardware
```

---

# 15. Products Table

```text
products

id
vendor_id
category_id
sku
name
description
unit
purchase_price
selling_price
minimum_stock
status
created_at
updated_at
```

Example:

```text
SKU: RICE-001
Name: Basmati Rice
Unit: KG
Purchase Price: ₹50
Selling Price: ₹65
Minimum Stock: 100 KG
```

The exact rules for SKU uniqueness will be finalized during implementation.

---

# 16. Warehouses Table

```text
warehouses

id
vendor_id
name
code
address
capacity
status
created_at
updated_at
```

Example:

```text
Warehouse A
WH-001
Bhubaneswar
Capacity: 50,000 KG
```

A vendor may have multiple warehouses.

---

# 17. Inventory Table

Inventory represents the current state for a product in a warehouse.

```text
inventory

id
vendor_id
warehouse_id
product_id
quantity
reserved_quantity
damaged_quantity
updated_at
```

Conceptually:

```text
available_quantity =
quantity - reserved_quantity
```

`available_quantity` may be calculated rather than permanently stored if appropriate.

---

# 18. Inventory Transactions Table

This is one of the most important tables.

```text
inventory_transactions

id
vendor_id
warehouse_id
product_id
type
quantity
reference_type
reference_id
reason
created_by
created_at
```

Transaction types:

```text
OPENING_STOCK
PURCHASE
SALE
ORDER_RESERVATION
ORDER_RELEASE
TRANSFER_IN
TRANSFER_OUT
RETURN
DAMAGE
ADJUSTMENT
```

Each transaction should identify its source whenever possible.

Example:

```text
PURCHASE
Product: Rice
Quantity: +500 KG
Reference: Purchase #PUR-1001
```

---

# 19. Orders Table

```text
orders

id
vendor_id
order_number
customer_name
customer_phone
customer_address
status
payment_status
subtotal
tax
discount
total_amount
order_date
created_at
updated_at
```

Payment statuses:

```text
PENDING
PARTIAL
PAID
REFUNDED
```

---

# 20. Order Items Table

```text
order_items

id
order_id
product_id
quantity
unit_price
discount
tax
total_price
```

Example:

```text
Order #ORD-1001

Basmati Rice
100 KG × ₹65

Sugar
50 KG × ₹45
```

---

# 21. Purchases Table

Purchases represent goods coming into the business.

```text
purchases

id
vendor_id
supplier_name
invoice_number
purchase_date
subtotal
tax
discount
total_amount
payment_status
created_at
updated_at
```

---

# 22. Purchase Items Table

```text
purchase_items

id
purchase_id
product_id
quantity
unit_cost
tax
discount
total_price
```

Completing a purchase should result in inventory transactions.

```text
Purchase
  ↓
Purchase Items
  ↓
Inventory Transaction
  ↓
Inventory increases
```

---

# 23. Sales Table

```text
sales

id
vendor_id
order_id
customer_name
subtotal
tax
discount
total_amount
sale_date
payment_status
created_at
```

The exact relationship between Orders and Sales will be finalized during implementation based on the actual business workflow.

---

# 24. Expenses Table

```text
expenses

id
vendor_id
category
description
amount
expense_date
payment_method
created_by
created_at
```

Possible expense categories:

```text
SALARY
TRANSPORT
ELECTRICITY
RENT
MAINTENANCE
PACKAGING
OTHER
```

---

# 25. Employees Table

```text
employees

id
vendor_id
name
employee_code
phone
email
designation
joining_date
status
created_at
updated_at
```

Example:

```text
EMP-001
Rahul
Warehouse Manager
ACTIVE
```

---

# 26. Employee Activities Table

```text
employee_activities

id
employee_id
activity_type
description
activity_date
status
created_at
```

Examples:

```text
Stock Receiving
Inventory Checking
Order Processing
Packing
Dispatch
Stock Verification
```

Example dashboard activity:

```text
09:00  Rahul   Stock Receiving
11:30  Amit    Inventory Checking
14:00  Priya   Order Processing
16:00  Rahul   Stock Verification
```

---

# 27. Finance Transactions

A financial transaction table can support reporting and reconciliation.

```text
finance_transactions

id
vendor_id
type
reference_type
reference_id
amount
description
transaction_date
created_at
```

Possible types:

```text
REVENUE
EXPENSE
PURCHASE
REFUND
OTHER
```

The final accounting model should be refined according to the actual business requirements.

---

# 28. Profit & Loss

Initial operational formula:

```text
Revenue
-
Cost of Goods Sold
-
Operating Expenses
=
Net Profit
```

Example:

```text
Revenue                  ₹10,00,000
COGS                      ₹6,00,000
-----------------------------------
Gross Profit              ₹4,00,000

Operating Expenses        ₹1,50,000
-----------------------------------
Net Profit                ₹2,50,000
```

Important:

The system should derive financial values from underlying transactions instead of manually entering a single `profit` number.

The exact accounting treatment must be confirmed with the business/accounting requirements before production use.

---

# 29. Audit Logs

Important business changes should be traceable.

```text
audit_logs

id
user_id
vendor_id
action
entity
entity_id
old_value
new_value
ip_address
created_at
```

Example:

```text
User: Rahul
Action: UPDATE
Entity: Inventory
Old Value: 500 KG
New Value: 450 KG
Time: 14:32
```

Audit logs should be designed carefully so users cannot silently modify historical records.

---

# 30. Database Relationships

Simplified model:

```text
USER
 |
 └── VENDOR
       |
       ├── CATEGORIES
       |
       ├── PRODUCTS
       |     |
       |     └── INVENTORY
       |            |
       |            └── INVENTORY TRANSACTIONS
       |
       ├── WAREHOUSES
       |
       ├── ORDERS
       |     |
       |     └── ORDER ITEMS
       |
       ├── PURCHASES
       |     |
       |     └── PURCHASE ITEMS
       |
       ├── SALES
       |
       ├── EXPENSES
       |
       └── EMPLOYEES
             |
             └── EMPLOYEE ACTIVITIES
```

---

# 31. Dashboard

The dashboard is the central business overview.

It should show information appropriate to the authenticated role.

## Admin Dashboard

Possible KPI cards:

```text
Total Vendors
Total Products
Total Orders
Total Sales
Total Inventory
Reserved Inventory
Low Stock Products
Total Employees
Revenue
Expenses
Profit
```

## Vendor Dashboard

Possible KPI cards:

```text
Today's Sales
Monthly Sales
Orders
Pending Orders
Available Stock
Reserved Stock
Low Stock
Employees
Today's Revenue
Today's Expenses
Today's Profit
```

---

# 32. Dashboard Layout

Conceptual layout:

```text
┌─────────────────────────────────────────────────────┐
│ Dashboard                            Date / User    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Sales       Orders       Stock       Profit         │
│ ₹12.5L      342         18,420       ₹3.2L          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│                 SALES / P&L GRAPH                   │
│                                                     │
├────────────────────────┬────────────────────────────┤
│ Inventory              │ Orders                     │
│                        │                            │
│ Total                  │ Pending                    │
│ Reserved               │ Processing                 │
│ Available              │ Delivered                  │
│ Low Stock              │ Cancelled                  │
├────────────────────────┼────────────────────────────┤
│ Employees              │ Today's Activities        │
│                        │                            │
│ Total                  │ Stock Receiving             │
│ Present                │ Order Processing            │
│ Absent                 │ Dispatch                    │
└────────────────────────┴────────────────────────────┘
```

---

# 33. Dashboard API

Initial concept:

```text
GET /dashboard
```

Possible response:

```json
{
  "sales": {
    "today": 125000,
    "month": 2450000
  },
  "orders": {
    "pending": 32,
    "processing": 18,
    "completed": 125
  },
  "inventory": {
    "total": 18500,
    "reserved": 2400,
    "lowStock": 12
  },
  "employees": {
    "total": 25,
    "present": 21,
    "absent": 2
  },
  "profit": {
    "today": 25000,
    "month": 450000
  }
}
```

This is only an example contract. The final response will be defined after the database and business rules are implemented.

---

# 34. Real-Time Updates

## Version 1

Use standard API requests.

Example:

```text
User submits form
       ↓
POST API
       ↓
NestJS
       ↓
PostgreSQL
       ↓
API response
       ↓
React updates UI
```

This is enough for the first MVP.

## Version 2

Introduce WebSockets.

Example:

```text
Vendor receives 500 KG
       ↓
NestJS updates PostgreSQL
       ↓
NestJS emits inventory.updated
       ↓
Admin Dashboard receives event
       ↓
Dashboard updates without page refresh
```

Potential events:

```text
inventory.updated
order.created
order.updated
purchase.created
sale.created
employee.activity.created
notification.created
```

Do not make WebSockets a prerequisite for the first working version.

---

# 35. React Application Structure

Recommended structure:

```text
frontend/

src/

├── assets/
├── components/
│   ├── Button/
│   ├── Modal/
│   ├── Table/
│   ├── Card/
│   └── Chart/
│
├── layouts/
│   ├── AdminLayout/
│   └── VendorLayout/
│
├── pages/
│   ├── Login/
│   ├── Dashboard/
│   ├── Products/
│   ├── Categories/
│   ├── Inventory/
│   ├── Warehouses/
│   ├── Orders/
│   ├── Purchases/
│   ├── Sales/
│   ├── Expenses/
│   ├── Employees/
│   └── Reports/
│
├── routes/
├── services/
├── hooks/
├── context/
├── utils/
├── constants/
├── styles/
│
├── App.jsx
└── main.jsx
```

---

# 36. NestJS Application Structure

Recommended structure:

```text
backend/

src/

├── auth/
├── users/
├── vendors/
├── products/
├── categories/
├── warehouses/
├── inventory/
├── inventory-transactions/
├── orders/
├── purchases/
├── sales/
├── expenses/
├── employees/
├── employee-activities/
├── finance/
├── dashboard/
├── reports/
├── notifications/
├── audit-logs/
│
├── common/
├── database/
│
├── app.module.ts
└── main.ts
```

Each module should have a clear responsibility.

---

# 37. API Structure

Initial API design:

```text
/auth
    POST   /login
    POST   /logout
    GET    /me

/vendors
    GET    /
    GET    /:id
    POST   /
    PATCH  /:id
    DELETE /:id

/products
    GET    /
    GET    /:id
    POST   /
    PATCH  /:id
    DELETE /:id

/categories
    GET    /
    POST   /
    PATCH  /:id
    DELETE /:id

/warehouses
    GET    /
    GET    /:id
    POST   /
    PATCH  /:id
    DELETE /:id

/inventory
    GET    /
    GET    /:productId
    POST   /receive
    POST   /adjust
    POST   /transfer

/orders
    GET    /
    GET    /:id
    POST   /
    PATCH  /:id
    POST   /:id/confirm
    POST   /:id/dispatch
    POST   /:id/cancel

/purchases
    GET    /
    GET    /:id
    POST   /
    PATCH  /:id

/sales
    GET    /
    GET    /:id

/employees
    GET    /
    GET    /:id
    POST   /
    PATCH  /:id
    DELETE /:id

/expenses
    GET    /
    POST   /
    PATCH  /:id

/dashboard
    GET    /

/reports
    GET    /sales
    GET    /inventory
    GET    /orders
    GET    /purchases
    GET    /expenses
    GET    /profit-loss
```

The API will evolve as the requirements become more precise.

---

# 38. React Routes

Initial application routes:

```text
/login

/dashboard

/products
/products/new
/products/:id

/categories

/inventory
/inventory/transactions

/warehouses
/warehouses/:id

/orders
/orders/:id

/purchases
/purchases/:id

/sales

/expenses

/employees
/employees/:id

/reports
/reports/sales
/reports/inventory
/reports/profit-loss

/settings
```

Access is controlled by authentication and role.

---

# 39. Navigation

Possible sidebar:

```text
Dashboard

Business
  Products
  Categories
  Warehouses

Inventory
  Stock
  Transactions
  Transfers

Orders
  All Orders
  Pending
  Processing
  Delivered

Finance
  Sales
  Purchases
  Expenses
  Profit & Loss

Employees

Reports

Settings
```

---

# 40. Authentication

Login:

```text
Email
Password
```

API:

```text
POST /auth/login
```

Response will contain a JWT access token.

Conceptually the JWT payload may contain:

```json
{
  "sub": 15,
  "role": "VENDOR",
  "vendorId": 4
}
```

Exact token design will be finalized during implementation.

NestJS guards will enforce:

- Authentication
- Role authorization
- Vendor ownership

---

# 41. Important Security Requirements

The application must eventually implement:

- Password hashing
- JWT authentication
- Role-based authorization
- Vendor data isolation
- Input validation
- DTO validation
- Rate limiting where appropriate
- Secure CORS configuration
- Environment variables for secrets
- Database access controls
- Audit logging
- Safe error responses
- No passwords in logs
- No sensitive secrets in Git
- HTTPS in production
- Database backup strategy
- Soft deletion where historical records must be retained

---

# 42. Soft Delete

Important business records should generally not be hard-deleted immediately.

Possible fields:

```text
is_active
deleted_at
```

This is especially important for:

- Products
- Vendors
- Employees
- Warehouses
- Categories

Historical transactions should generally remain available.

---

# 43. Low Stock

Each product can have:

```text
minimum_stock
```

Example:

```text
Current Stock = 75 KG
Minimum Stock = 100 KG
```

System status:

```text
LOW STOCK
```

If:

```text
Current Stock = 0
```

status can become:

```text
OUT OF STOCK
```

---

# 44. Reports

Planned reports:

```text
Inventory Report
Sales Report
Purchase Report
Order Report
Expense Report
Profit & Loss Report
Employee Report
Stock Movement Report
Low Stock Report
Vendor Report
```

Date filters:

```text
Today
Yesterday
Last 7 Days
This Month
Last Month
Custom Date Range
```

Reports should use transaction data rather than manually maintained summary fields wherever possible.

---

# 45. Future Features

Possible future additions:

```text
Barcode scanning
QR codes
Purchase orders
Supplier management
Customer management
Returns
Stock transfers
Multi-location inventory
Batch tracking
Expiry tracking
Serial numbers
Warehouse zones
Bin locations
Picking
Packing
Shipping
Delivery tracking
Invoice generation
PDF exports
Excel exports
Email notifications
SMS/WhatsApp integrations
Advanced analytics
Forecasting
Mobile/PWA support
```

These should not be added to the MVP unless required.

---

# 46. MVP Scope

The first production-oriented MVP should contain:

```text
✓ Login
✓ Admin
✓ Vendor
✓ Products
✓ Categories
✓ Warehouses
✓ Inventory
✓ Inventory transactions
✓ Orders
✓ Purchases
✓ Sales
✓ Expenses
✓ Basic P&L
✓ Employees
✓ Dashboard
```

After the MVP:

```text
Notifications
WebSockets
Advanced reports
Audit system enhancements
Exports
Advanced analytics
```

---

# 47. Development Phases

## Phase 0 — Requirements

- Business rules
- User permissions
- Stock flow
- Order flow
- Purchase flow
- Sales flow
- Finance flow
- Employee flow
- Reporting requirements

## Phase 1 — Project Setup

- React project
- NestJS project
- PostgreSQL
- TypeORM
- Environment configuration
- Git repository

## Phase 2 — Database Foundation

- Entities
- Relationships
- Migrations
- Seed data

## Phase 3 — Authentication

- User
- Login
- JWT
- Password hashing
- Guards
- Roles
- Protected routes

## Phase 4 — Vendor & Product

- Vendors
- Categories
- Products
- SKU management

## Phase 5 — Warehouse & Inventory

- Warehouses
- Inventory
- Stock receiving
- Stock adjustments
- Stock transfers
- Inventory transactions
- Low-stock logic

## Phase 6 — Orders

- Orders
- Order items
- Stock reservation
- Order statuses
- Dispatch
- Cancellation

## Phase 7 — Purchasing & Sales

- Purchases
- Purchase items
- Sales
- Payment status

## Phase 8 — Employees

- Employees
- Activities
- Attendance if required

## Phase 9 — Finance

- Expenses
- Revenue
- COGS
- P&L
- Financial transactions

## Phase 10 — Dashboard

- Dashboard APIs
- KPI calculations
- Charts
- Tables
- Alerts

## Phase 11 — Reports

- Sales
- Inventory
- Orders
- Purchases
- Expenses
- P&L
- Stock movement

## Phase 12 — Real-Time

- WebSockets
- Live inventory
- Live orders
- Notifications

## Phase 13 — Testing

- Unit tests
- Integration tests
- API tests
- Authorization tests
- Inventory workflow tests
- Financial calculation tests
- Frontend tests
- End-to-end tests

## Phase 14 — Production

- Production configuration
- Database backup
- Logging
- Monitoring
- Security hardening
- Deployment
- Performance testing

---

# 48. Development Order

The project should be developed in this order:

```text
1. Requirements
2. Database design
3. Project setup
4. PostgreSQL
5. TypeORM
6. NestJS foundation
7. Authentication
8. User + Vendor
9. Category
10. Product
11. Warehouse
12. Inventory
13. Inventory transactions
14. Orders
15. Purchases
16. Sales
17. Employees
18. Expenses
19. Finance / P&L
20. Dashboard APIs
21. React Dashboard
22. Remaining React screens
23. Real-time updates
24. Reports
25. Testing
26. Deployment
```

---

# 49. First Development Milestone

The first milestone is NOT the dashboard.

It is:

```text
WMS FOUNDATION

PostgreSQL
     ↓
TypeORM
     ↓
NestJS
     ↓
Authentication
     ↓
User
     ↓
Vendor
     ↓
Category
     ↓
Product
```

Then:

```text
Warehouse
     ↓
Inventory
     ↓
Inventory Transactions
```

Then:

```text
Orders
     ↓
Sales
     ↓
Finance
     ↓
Dashboard
```

---

# 50. Initial Folder Structure

Repository:

```text
WMS/

├── backend/
│
├── frontend/
│
├── docs/
│
├── .gitignore
└── README.md
```

The `docs` directory should eventually contain:

```text
docs/

├── WMS-PROJECT-BLUEPRINT.md
├── DATABASE-DESIGN.md
├── API-DOCUMENTATION.md
├── BUSINESS-RULES.md
├── UI-SPECIFICATION.md
└── DEPLOYMENT.md
```

---

# 51. Environment Variables

Never hard-code secrets.

Backend `.env` will eventually contain values similar to:

```env
NODE_ENV=development

PORT=3000

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=wms
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password

JWT_SECRET=your_secret
JWT_EXPIRES_IN=1d
```

Actual production secrets must never be committed to Git.

Use `.env.example` for documentation:

```env
NODE_ENV=
PORT=

DATABASE_HOST=
DATABASE_PORT=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=

JWT_SECRET=
JWT_EXPIRES_IN=
```

---

# 52. Git Strategy

Recommended branches:

```text
main
develop
feature/*
bugfix/*
```

Examples:

```text
feature/authentication
feature/products
feature/inventory
feature/orders
feature/dashboard
```

Commit examples:

```text
feat: initialize NestJS backend
feat: add PostgreSQL configuration
feat: add user entity
feat: add vendor entity
feat: implement login
feat: add product module
fix: prevent negative inventory
```

---

# 53. Testing Strategy

Testing is especially important for inventory and finance.

Critical scenarios:

### Inventory

```text
Receive stock
Sell stock
Reserve stock
Release reservation
Damage stock
Return stock
Transfer stock
Adjust stock
Prevent negative stock
```

### Orders

```text
Create order
Confirm order
Reserve stock
Cancel order
Dispatch order
Complete order
```

### Finance

```text
Record sale
Record purchase
Record expense
Calculate revenue
Calculate COGS
Calculate profit
```

### Authorization

```text
Admin can access all vendors
Vendor can access own data
Vendor cannot access another vendor's data
Unauthorized user cannot access protected endpoints
```

---

# 54. Important Business Questions To Finalize Later

Before production, the following business rules must be explicitly confirmed:

1. What exactly does a "vendor" represent?
2. Can one vendor have multiple warehouses?
3. Can a product exist in multiple warehouses?
4. Are products measured in KG, pieces, liters, boxes, etc.?
5. Do products require batch numbers?
6. Do products have expiry dates?
7. Are there serial-numbered products?
8. Who are the customers?
9. Who are the suppliers?
10. Are purchases always linked to suppliers?
11. Are sales always generated from orders?
12. Can orders be partially fulfilled?
13. Can an order contain products from multiple warehouses?
14. How are returns handled?
15. How are damaged goods handled?
16. How should stock transfers work?
17. What accounting definition should be used for P&L?
18. Is tax/GST required?
19. Is payment tracking required?
20. Is employee attendance required?
21. Should employees have login accounts?
22. Who can modify historical transactions?
23. What reports must be exportable?
24. Is invoice generation required?
25. Is barcode/QR support required?
26. Is multi-location support required?
27. What notifications are required?
28. What data should Admin see globally versus per vendor?

These should be converted into explicit business rules before the relevant module is finalized.

---

# 55. Important Design Principles

## Principle 1 — Database First

Do not build large parts of the UI before understanding the underlying data.

## Principle 2 — Business Logic in Backend

React should not be responsible for authoritative inventory or financial calculations.

## Principle 3 — Backend Is the Source of Truth

The server and database determine:

- Stock
- Orders
- Financial records
- Permissions
- Ownership

## Principle 4 — Transactions Over Manual Totals

Record events and derive state.

## Principle 5 — Vendor Isolation

Every vendor-owned query must be scoped correctly.

## Principle 6 — Auditability

Important business changes should be traceable.

## Principle 7 — Start Small

Build the MVP before advanced real-time functionality.

## Principle 8 — Keep Modules Independent

Each NestJS module should have a clear responsibility.

## Principle 9 — Test Business-Critical Logic

Inventory and financial calculations require strong automated tests.

## Principle 10 — Design for Growth

Do not over-engineer the first version, but avoid structures that prevent future expansion.

---

# 56. Definition of Done

A feature is not considered complete simply because its screen exists.

For each module, "done" should mean:

```text
✓ Database entity
✓ Database migration
✓ Backend module
✓ DTO validation
✓ Service/business logic
✓ Controller/API
✓ Authorization
✓ Error handling
✓ Frontend page
✓ API integration
✓ Loading state
✓ Empty state
✓ Error state
✓ Form validation
✓ Tests
✓ Audit requirements considered
```

---

# 57. First Real Business Scenario

The first complete workflow we should implement is:

```text
1. Admin logs in.
2. Admin creates a vendor.
3. Vendor account is created.
4. Vendor logs in.
5. Vendor creates a category.
6. Vendor creates a product.
7. Vendor creates a warehouse.
8. Vendor receives stock.
9. System creates inventory transaction.
10. Inventory quantity increases.
11. Vendor sees updated inventory.
12. Admin can see the vendor's updated inventory.
```

If this flow works correctly, we have the foundation of a real WMS.

---

# 58. Project Success Criteria

The WMS should eventually allow the business to answer questions such as:

### Inventory

- How much stock do we have?
- Where is it?
- How much is reserved?
- Which products are low?
- What happened to the stock?
- Who changed it?

### Orders

- How many orders are pending?
- Which orders are processing?
- Which orders are dispatched?
- Which orders are cancelled?

### Finance

- How much did we sell?
- How much did we spend?
- What is revenue?
- What is COGS?
- What is operating expense?
- What is operational profit?

### Employees

- How many employees are there?
- Who is active?
- Who is present?
- What activities happened today?

### Vendors

- How many vendors exist?
- What is each vendor's inventory?
- What are their sales?
- What are their orders?
- What is their operational P&L?

---

# 59. Final Architecture Goal

```text
                         WMS APPLICATION

        ┌────────────────────┴────────────────────┐
        │                                         │
      ADMIN                                    VENDOR
        │                                         │
        └────────────────────┬────────────────────┘
                             │
                       React Frontend
                             │
                       REST / WebSocket
                             │
                       NestJS Backend
                             │
             ┌───────────────┼────────────────┐
             │               │                │
           Auth           Business         Reports
             │             Modules             │
             │               │                │
             └───────────────┼────────────────┘
                             │
                          TypeORM
                             │
                        PostgreSQL
                             │
                    Transaction History
                             │
                    Current Business State
```

---

# 60. Immediate Next Step

Do NOT build the entire application immediately.

The next implementation sequence is:

```text
STEP 1
Install/verify Node.js

STEP 2
Install/verify PostgreSQL

STEP 3
Install Git

STEP 4
Create WMS repository

STEP 5
Create NestJS backend

STEP 6
Connect NestJS to PostgreSQL using TypeORM

STEP 7
Create initial database entities

STEP 8
Run the first migration

STEP 9
Create seed data

STEP 10
Build authentication

STEP 11
Create the first working vendor/product/inventory flow
```

After that foundation is stable, React will be connected to the API.

---

# 61. Golden Rule For This Project

The system should be thought of as:

```text
BUSINESS EVENT
      ↓
DATABASE TRANSACTION
      ↓
CURRENT BUSINESS STATE
      ↓
API
      ↓
REACT UI
      ↓
DASHBOARD / REPORT
```

Example:

```text
"500 KG Rice Received"
          ↓
Inventory Transaction +500
          ↓
Inventory = Previous + 500
          ↓
API returns new state
          ↓
React updates
          ↓
Dashboard shows new stock
          ↓
Reports include the transaction
```

This architecture should guide the entire project.
