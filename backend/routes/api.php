<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;

Route::get('/user', function () {
	return User::all();
});

Route::post('/user', function (Request $request) {
	$user_data = $request->json()->all();

	$user = User::create($user_data);

	return $user;
});

// curl -H "Content-type: application/json" -d '{"name": "user test 1", "age":36, "address": "345 Madison Ave"}' http://springfinancial.local/api/user