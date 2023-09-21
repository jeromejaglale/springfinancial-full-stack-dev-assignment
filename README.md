# Spring Financial Full Stack Developer Assignement - Leaderboard Application

Go to https://sf-fsd-frontend.jeromejaglale.me

To run the application locally, see the instructions below.

Any questions? Contact me at jerome.jaglale@gmail.com. Thank you!

## Running the application locally

Clone this GitHub repository to your local machine.

```
git clone https://github.com/jeromejaglale/springfinancial-full-stack-dev-assignment.git
```

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

Check it's working by pointing your browser to `<your webserver url>/api/user`. It should return some empty JSON.

Finally, to use this backend with the frontend, in `frontend/src/constants.js`, change `USER_ENDPOINT` to `<your webserver url>/api/user`

## Backend API endpoints
- GET `/api/user`: list of users
- GET `/api/user/{user_id}`: get user by `id`
- POST `/api/user` with JSON body (`name`, `age`, `address`): create  new user
- DELETE `/api/user/{user_id}`: delete user
- PUT `/api/user/{user_id}/add-point`: add point to user
- PUT `/api/user/{user_id}/remove-point`: remove point from user

## Backend tests
From the `backend` folder, run `php artisan test`. This will run the tests in `tests/Feature/UserTest.php`, testing each endpoint.

## Notes
With more time, I would have added:
- error handling: for the backend, requiring a non-empty name and an integer for the age. For the frontend, when AJAX requests fail, or return unexpected content
- frontend tests, for example to check the popups are displayed when clicking on the buttons, and the functionnality of the delete button, "add point" button, and "remove point" button
- micro-animations when adding a new user, and when adding or removing a point, in order to make it clear that the interaction happened
- an animation when re-ordering the users, when sorted by score. It's currently barely noticeable and very confusing when adding two points to the same user, and that user position in the list changes, for example.
- break up the CSS into the corresponding components for reusability
- highlight of the top three players
