<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pets;
use Illuminate\Http\Request;

class PetsController extends Controller
{
    // GET all pets
    public function getAllPets()
    {
        return response()->json(Pets::all());
    }

    // GET all pets of given user
    public function getUsersPets($userId)
    {
        $pets = Pets::where('users_id', $userId)->get();

        if ($pets->isEmpty()) {
            return response()->json(['message' => 'No pets found for this user'], 404);
        }

        return response()->json($pets);
    }

    // GET single pet
    public function getPet($id)
    {
        $pet = Pets::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($pet);
    }

    // CREATE pet
    public function savePet(Request $request)
    {
        $pet = Pets::create($request->all());

        return response()->json($pet, 201);
    }

    // UPDATE pet
    public function updatePet(Request $request, $id)
    {
        $pet = Pets::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $pet->update($request->all());

        return response()->json($pet);
    }

    // DELETE pet
    public function deletePet($id)
    {
        $pet = Pets::find($id);

        if (!$pet) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $pet->delete();

        return response()->json(['message' => 'Deleted']);
    }
}