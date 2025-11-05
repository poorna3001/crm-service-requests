
# CRM Backend (Node.js + Express + MongoDB)

## Setup
1. Copy `.env.example` to `.env` and set values (MONGO_URI, JWT_SECRET).
2. Install deps: `npm install`
3. Run server: `npm run dev` (requires nodemon) or `npm start`

## Notes
- The server will auto-create an admin user on first run if ADMIN_EMAIL and ADMIN_PASSWORD are set in .env
