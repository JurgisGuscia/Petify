<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Users;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getAllUsers()
    {
        return Users::limit(10)->get();
    }

    public function getUser($id)
    {
        return Users::findOrFail($id);
    }

    public function saveUser(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|max:255',
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'dateOfBirth' => 'required|date',
            'priceProfiles_id' => 'nullable|integer',
            'userType' => 'required|string|max:255',
        ]);

        $user = Users::create($validated);

        return response()->json($user, 201);
    }

    public function updateUser(Request $request, $id)
    {
        $user = Users::findOrFail($id);

        $validated = $request->validate([
            'password' => 'sometimes|string|max:255',
            'firstName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'dateOfBirth' => 'sometimes|date',
        ]);

        $user->update($validated);

        return response()->json($user, 200);
    }

    public function deleteUser($id)
    {
        $user = Users::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}