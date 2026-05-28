# SIARE 

Society of Integrated Academic Research and Education (SIARE)

Integrating Knowledge. Empowering Scholars. Accelerating Global Research Impact through Peer-Reviewed Excellence.

## Backend Setup

The backend now runs independently as a Node.js + Express.js API with MySQL and Sequelize.

1. Install dependencies:

```bash
npm install
```

2. Create environment files:

```bash
cp env.local.example .env.local
cp backend/env.example backend/.env
```

3. Update secrets and database settings:

```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
SESSION_SECRET=replace-with-the-same-secret-used-by-the-backend

# backend/.env
PORT=5000
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=siare
MYSQL_USER=root
MYSQL_PASSWORD=
DB_SYNC=true
SESSION_SECRET=replace-with-a-long-random-secret
CORS_ORIGIN=http://localhost:9002,http://localhost:3000
```

4. Create the MySQL database if it does not exist:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS siare;"
```

5. Seed the first admin account:

```bash
npm run seed:admin
```

6. Run backend and frontend separately:

```bash
npm run backend:dev
npm run dev
```

Production backend command:

```bash
npm run backend:start
```
