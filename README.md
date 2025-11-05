
# CRM for Service Requests (Helpdesk) - Starter Project (Updated)

This updated package includes fixes:
- dotenv added to backend package.json
- server auto-creates admin user when ADMIN_EMAIL and ADMIN_PASSWORD are set in .env
- frontend .env.example added
- minor fixes

## Quick start
1. Unzip, then in crm-backend:
   - copy .env.example to .env and set MONGO_URI and ADMIN credentials
   - npm install
   - npm run dev
2. In crm-frontend:
   - copy .env.example to .env
   - npm install
   - npm run dev
