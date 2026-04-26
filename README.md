# Expense Tracker

A full-stack personal expense tracking application built with React, Vite, Node.js, Express, and MongoDB. The app lets users record expenses, view totals, filter by category, sort by date, and see a category-wise breakdown of spending.

## Overview

This project is split into two apps:

- `frontend/` contains the React user interface.
- `backend/` contains the Express API and MongoDB integration.

The frontend sends expense data to the backend, and the backend stores it in MongoDB. Expenses are stored as integer paise/cents internally to avoid floating-point precision issues in money calculations.

## Features

- Add a new expense with:
  - amount
  - category
  - date
  - optional description
- Automatically uses the current date as the default value in the form.
- Prevents duplicate submissions using an `idempotencyKey`.
- Fetches all saved expenses from MongoDB.
- Filters expenses by category.
- Sorts expenses by date:
  - newest first
  - oldest first
- Shows a running total of all currently visible expenses.
- Displays category-wise expense breakdown with:
  - total amount per category
  - percentage share
  - progress bars
- Shows loading, empty, and error states in the expense list.
- Uses `helmet` for secure HTTP headers and `morgan` for request logging.
- Uses a responsive, card-based UI.

## Tech Stack

### Frontend

- React 19
- React DOM 19
- Vite
- Tailwind CSS tooling
- PostCSS
- Autoprefixer
- PropTypes

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- dotenv
- cors
- helmet
- morgan
- nodemon

## Dependencies

### Frontend dependencies

| Package | Purpose |
| --- | --- |
| `react` | Builds the UI with components and hooks |
| `react-dom` | Mounts the React app in the browser |
| `prop-types` | Runtime prop validation for components |
| `vite` | Frontend dev server and build tool |
| `@vitejs/plugin-react` | React support for Vite |
| `tailwindcss` | Utility-first CSS framework tooling |
| `postcss` | CSS processing pipeline |
| `autoprefixer` | Adds vendor prefixes to CSS |

### Backend dependencies

| Package | Purpose |
| --- | --- |
| `express` | REST API server |
| `mongoose` | MongoDB object modeling |
| `dotenv` | Loads environment variables from `.env` |
| `cors` | Enables cross-origin requests from the frontend |
| `helmet` | Adds basic HTTP security headers |
| `morgan` | Logs incoming HTTP requests |
| `nodemon` | Auto-restarts the backend during development |
| `nit` | Present in `backend/package.json`; not currently referenced in the app code |

## Functionality Breakdown

### 1. Add expense

The form allows users to submit:

- `amount`
- `category`
- `date`
- `description` (optional)

When the form is submitted:

- the frontend generates a unique `idempotencyKey`
- the backend validates required fields
- the amount is converted to integer paise/cents
- the document is saved to MongoDB

### 2. Expense listing

The app fetches expense records from the backend and displays them in a table with:

- date
- category
- description
- amount

### 3. Filtering and sorting

Users can:

- filter expenses by category
- sort by date ascending or descending

These options are passed as query parameters to the backend API.

### 4. Summary total

The top section of the app calculates the sum of all currently displayed expenses and shows it as the total expense figure.

### 5. Expense breakdown

The breakdown panel groups visible expenses by category and shows:

- category total
- percentage of the overall total
- a visual progress bar

### 6. Backend protections

- Duplicate POST retries are handled using a unique `idempotencyKey`.
- Money values are stored as integers to reduce precision issues.
- `helmet` secures common HTTP headers.
- `morgan` logs requests in development.

## Project Structure

```text
ExpenseTracker/
|-- README.md
|-- backend/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   `-- expenseController.js
|   |-- middlewares/
|   |   |-- errorHandler.js
|   |   `-- validateRequest.js
|   |-- models/
|   |   `-- Expense.js
|   |-- routes/
|   |   `-- expenseRoutes.js
|   |-- utils/
|   |   `-- moneyMath.js
|   |-- .env
|   |-- index.js
|   |-- package.json
|   `-- package-lock.json
|-- frontend/
|   |-- dist/
|   |-- src/
|   |   |-- api/
|   |   |   `-- client.js
|   |   |-- components/
|   |   |   |-- ExpenseBreakdown.jsx
|   |   |   |-- ExpenseFilter.jsx
|   |   |   |-- ExpenseForm.jsx
|   |   |   |-- ExpenseList.jsx
|   |   |   `-- Summary.jsx
|   |   |-- hooks/
|   |   |   `-- useExpenses.js
|   |   |-- utils/
|   |   |   |-- constants.js
|   |   |   |-- currency.js
|   |   |   `-- idempotency.js
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- .env
|   |-- index.html
|   |-- package.json
|   |-- package-lock.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- vite.config.js
`-- .gitignore
```

## Important Files

### Frontend

- `frontend/src/App.jsx`
  Main layout that combines the form, filters, breakdown, and list.

- `frontend/src/hooks/useExpenses.js`
  Fetches expenses from the backend whenever the filter or sort order changes.

- `frontend/src/components/ExpenseForm.jsx`
  Handles creating a new expense entry.

- `frontend/src/components/ExpenseFilter.jsx`
  Handles category filter and date sorting controls.

- `frontend/src/components/ExpenseList.jsx`
  Renders the expense table and loading/error/empty states.

- `frontend/src/components/ExpenseBreakdown.jsx`
  Computes and displays category totals and percentages.

### Backend

- `backend/index.js`
  Starts the Express server, registers middleware, and mounts routes.

- `backend/config/db.js`
  Connects the backend to MongoDB.

- `backend/models/Expense.js`
  Defines the Mongoose schema for expenses.

- `backend/controllers/expenseController.js`
  Contains the create and fetch expense logic.

- `backend/routes/expenseRoutes.js`
  Registers the `/api/expenses` API endpoints.

- `backend/utils/moneyMath.js`
  Converts decimal amounts into integer paise/cents.

## Expense Data Model

Each expense record contains:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `amount` | `Number` | Yes | Stored as integer paise/cents |
| `category` | `String` | Yes | Category selected from the UI |
| `description` | `String` | No | Defaults to an empty string |
| `date` | `Date` | Yes | Expense date |
| `idempotencyKey` | `String` | Yes | Unique key used to prevent duplicate submissions |
| `created_at` | `Date` | Auto | Added by Mongoose timestamps |

## API Endpoints

### `POST /api/expenses`

Creates a new expense.

Example request body:

```json
{
  "amount": 250.75,
  "category": "Food & Dining",
  "description": "Dinner",
  "date": "2026-04-26",
  "idempotencyKey": "550e8400-e29b-41d4-a716-446655440000"
}
```

### `GET /api/expenses`

Returns expenses from MongoDB.

Optional query parameters:

- `category=Food%20%26%20Dining`
- `sort=date_desc`
- `sort=date_asc`

Example:

```text
GET /api/expenses?category=Shopping&sort=date_desc
```

## Environment Variables

### Backend `.env`

Create `backend/.env` with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

### Frontend `.env`

The codebase includes `frontend/src/api/client.js`, which supports:

```env
VITE_API_URL=http://localhost:5000/api
```

Current note: the main form and fetch hook are still using `http://localhost:5000` directly, so the frontend currently expects the backend to run on port `5000`.

## Prerequisites

Make sure you have these installed:

- Node.js
- npm
- MongoDB local server or MongoDB Atlas

Recommended:

- Node.js 18+ or newer

## How To Run Locally

### 1. Install backend dependencies

```bash
cd backend
npm install
```

### 2. Configure backend environment variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/expense-tracker
```

### 3. Start MongoDB

Make sure your MongoDB server is running locally, or update `MONGO_URI` to point to your Atlas cluster.

### 4. Start the backend server

```bash
cd backend
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open a second terminal:

```bash
cd frontend
npm install
```

### 6. Start the frontend

```bash
cd frontend
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

### 7. Open the app

Visit:

```text
http://localhost:5173
```

## Available Scripts

### Frontend

- `npm run dev` starts the Vite development server
- `npm run build` creates a production build
- `npm run preview` previews the production build locally

### Backend

- `npm run dev` starts the backend with nodemon
- `npm start` starts the backend with Node.js

## Current Categories

The app currently supports these categories:

- Food & Dining
- Transportation
- Housing & Utilities
- Entertainment
- Shopping
- Health & Fitness
- Education
- Others

## Notes

- Expense amounts are stored in integer paise/cents in the database, while the UI shows a formatted currency value.
- Duplicate form submissions are protected by a unique idempotency key.
- `validateRequest.js` exists in the backend, but it is not currently attached to the routes.
- `Summary.jsx` exists in the frontend, but the app currently renders `ExpenseBreakdown.jsx` instead.
- `frontend/dist/` is present, which means the frontend has already been built at least once.

## Future Improvements

- Add edit and delete expense actions.
- Add monthly and category charts.
- Add authentication per user.
- Add search by description.
- Add pagination for large datasets.
- Centralize frontend API requests through `apiClient`.
- Attach request validation middleware to the POST route.
