# Spring Financial Full Stack Developer Assignement - Leaderboard Application

## Running the application

Clone this GitHub repository to your local machine.

### Frontend
From the `frontend` folder:
```
npm install
npx parcel src/index.html
```

Then go to http://localhost:1234/

Note: the backend at https://sf-fsd-backend.jeromejaglale.me/api/user is used by default.

### Backend
If you want to install your own backend, from the `backend` folder:
- copy `.env.example` to `.env`
- update the database credentials in `.env`: `DB_HOST`, `DB_PORT`, etc. 
- set up the Laravel app:
```bash
composer install
php artisan key:generate
php artisan -q storage:link
php artisan migrate
```

Finally, in `frontend/src/constants.js`, change `USER_ENDPOINT` to `<your webserver url>/api/user`

## Backend API endpoints
- GET `/api/user`: list of users
- GET `/api/user/{user_id}`: get user by `id`
- POST `/api/user` with JSON body (`name`, `age`, `address`): create  new user
- DELETE `/api/user/{user_id}`: delete user
- PUT `/api/user/{user_id}/add-point`: add point to user
- PUT `/api/user/{user_id}/remove-point`: remove point from user

## Backend tests
From the `backend` folder, run `php artisan test`. This will run the tests in `tests/Feature/UserTest.php`, testing each endpoint.



Any questions? Contact me at jerome.jaglale@gmail.com. Thank you!

