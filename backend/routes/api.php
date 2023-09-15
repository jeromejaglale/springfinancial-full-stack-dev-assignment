<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

// user list
Route::get('/user', function () {
	return User::all();
});

// create user
Route::post('/user', function (Request $request) {
	$user_data = $request->json()->all();

	$user = User::create($user_data);

	return $user;
});

// delete user
Route::delete('/user/{user_id}', function ($user_id) {
	$user = User::where('id', $user_id)->first();

	if($user == null) {
		abort(404);
	}

	$user->delete();
});


// curl -H "Content-type: application/json" -d '{"name": "user test 1", "age":36, "address": "345 Madison Ave"}' http://springfinancial.local/api/user
// curl -X DELETE http://springfinancial.local/api/user/2