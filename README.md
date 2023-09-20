# Spring Financial Full Stack Developer Assignement - Leaderboard Application

## Running the application

### Frontend
In the `frontend` folder:
```
npm install
npx parcel src/index.html
```

### Backend
The frontend uses by default an instance of the backend running at https://sf-fsd-backend.jeromejaglale.me/api/user

To install your own backend, in the `backend` folder:
- copy `.env.example` to `.env` and update the database credentials (DB_HOST, DB_PORT,etc) 
- then setup the Laravel app:
```bash
composer install
php artisan key:generate
php artisan -q storage:link
php artisan migrate
```

Then, in `frontend/src/constants.js`, update `USER_ENDPOINT` to the URL of your webserver: `<your webserver url>/api/user`