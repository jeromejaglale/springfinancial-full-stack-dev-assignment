<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
	use RefreshDatabase;

	protected $userName = 'Katherine Pryde';
	protected $userAge = 23;
	protected $userAddress = '1298 Phasing St';

    public function test_create_user()
    {
    	// test POST entry point
    	$response =  $this->postJson('/api/user', ['name' => $this->userName, 'age' => $this->userAge, 'address' => $this->userAddress]);    	
		$response->assertStatus(201)->assertJson([
            'name' => $this->userName,
            'age' => $this->userAge,
            'address' => $this->userAddress
        ]);

		$new_user_id = $response['id'];

    	// test GET user by id entry point
    	$response2 = $this->getJson('/api/user/' . $new_user_id);
		$response2->assertStatus(200)->assertJson([
            'name' => $this->userName,
            'age' => $this->userAge,
            'address' => $this->userAddress
        ]);
    }

    public function test_user_list()
    {
    	// test GET user list entry point

    	// check no user
        $response0 = $this->get('/api/user');
        $response0->assertStatus(200);
        $response0->assertJsonCount(0);

    	// create user
    	$response1 = $this->postJson('/api/user', ['name' => $this->userName, 'age' => $this->userAge, 'address' => $this->userAddress]);    	
        $new_user_id = $response1['id'];

		// get user list        
        $response2 = $this->get('/api/user');
        $response2->assertStatus(200);
		$response2->assertJsonCount(1);

        $user_id = $response2[0]['id'];        
		$this->assertEquals($user_id, $new_user_id);

    	// test DELETE user by id entry point

		// delete user
    	$response3 = $this->deleteJson('/api/user/' . $new_user_id);
    	$response3->assertStatus(200);

		// get user list        
        $response4 = $this->get('/api/user');
        $response4->assertStatus(200);
        $response4->assertJsonCount(0);
    }

    public function test_user_add_remove_point()
    {
    	// create user
    	$response1 = $this->postJson('/api/user', ['name' => $this->userName, 'age' => $this->userAge, 'address' => $this->userAddress]);    	
        $new_user_id = $response1['id'];

		// add point
		$response2 = $this->putJson('/api/user/' . $new_user_id . '/add-point');
		$response2->assertStatus(200);

		// get user
    	$response3 = $this->getJson('/api/user/' . $new_user_id);
		$response3->assertStatus(200)->assertJson([
            'name' => $this->userName,
            'age' => $this->userAge,
            'address' => $this->userAddress,
            'points' => 1
        ]);

		// remove point
		$response4 = $this->putJson('/api/user/' . $new_user_id . '/remove-point');
		$response4->assertStatus(200);

		// get user
    	$response3 = $this->getJson('/api/user/' . $new_user_id);
		$response3->assertStatus(200)->assertJson([
            'name' => $this->userName,
            'age' => $this->userAge,
            'address' => $this->userAddress,
            'points' => 0
        ]);
    }
}
