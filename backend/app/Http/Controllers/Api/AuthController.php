<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Users;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = Users::where('username', $validated['username'])->first();

        if (!$user || $user->password !== $validated['password']) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        return response()->json([
            'user_id' => $user->id
        ]);
    }

        public function register(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:1',
        ]);

        // Create user
        $user = Users::create([
            'username' => $validated['username'],
            'password' => $validated['password'],
            'priceProfiles_id' => 1,
            'userType' => 0
        ]);

        return response()->json([
            'message' => 'User registered successfully'
        ], 201);
    }

}