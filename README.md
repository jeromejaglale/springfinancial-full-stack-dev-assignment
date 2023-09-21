# Spring Financial Full Stack Developer Assignement - Leaderboard Application

## Running the application

### Frontend
In the `frontend` folder:
```
npm install
npx parcel src/index.html
```

Then go to http://localhost:1234/

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

Finally, in `frontend/src/constants.js`, update `USER_ENDPOINT` to `<your webserver url>/api/user`

## API endpoints
- GET `/api/user`: list of users
- GET `/api/user/{user_id}`: get user by `id`
- POST `/api/user` with JSON body (`name`, `age`, `address`): create  new user
- DELETE `/api/user/{user_id}`: delete user
- PUT `/api/user/{user_id}/add-point`: add point to user
- PUT `/api/user/{user_id}/remove-point`: remove point from user
