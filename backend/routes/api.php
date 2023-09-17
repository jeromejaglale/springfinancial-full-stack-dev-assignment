<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

// list of users
Route::get('/user', function () {
	return User::all();
});

// user by id
Route::get('/user/{user_id}', function ($user_id){
	$user = User::where('id', $user_id)->first();

	if($user == null) {
		abort(404);
	}

	return $user;
});

// create user
Route::post('/user', function (Request $request) {
	$user_data = $request->json()->all();

	if(isset($user_data['age']) && $user_data['age'] == '') {
		$user_data['age'] = null;
	}

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

	return new stdClass();
});

// add point
Route::put('/user/{user_id}/add-point', function ($user_id) {
	$user = User::where('id', $user_id)->first();

	if($user == null) {
		abort(404);
	}

	$user->points++;
	$user->save();

	return $user;
});

// remove point
Route::put('/user/{user_id}/remove-point', function ($user_id) {
	$user = User::where('id', $user_id)->first();

	if($user == null) {
		abort(404);
	}

	if($user->points > 0) {
		$user->points--;
		$user->save();		
	}

	return $user;
});
