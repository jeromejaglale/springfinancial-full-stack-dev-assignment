# Spring Financial Full Stack Developer Assignement - Leaderboard Application

## Running the application

### Frontend
In the `frontend` folder:
```
npm install
npx parcel src/index.html
```

### Backend
The frontend uses by default the backend instance running at https://sf-fsd-backend.jeromejaglale.me/api/user

To install your own backend, in the `backend` folder:
- copy `.env.example` to `.env`, then update the database credentials: `DB_HOST`, `DB_PORT`, etc. 
- set up the Laravel app:
```bash
composer install
php artisan key:generate
php artisan -q storage:link
php artisan migrate
```

Finally, in `frontend/src/constants.js`, update `USER_ENDPOINT`: `<your webserver url>/api/user`