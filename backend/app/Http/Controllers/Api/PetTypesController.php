<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PetTypes;
use Illuminate\Http\Request;

class PetTypesController extends Controller
{
    // GET all pet types
    public function getAllPetTypes()
    {
        return response()->json(PetTypes::all());
    }

    // GET single pet type
    public function getPetType($id)
    {
        $petType = PetTypes::find($id);

        if (!$petType) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($petType);
    }

    // CREATE pet type
    public function savePetType(Request $request)
    {
        $petType = PetTypes::create($request->all());

        return response()->json($petType, 201);
    }

    // UPDATE pet type
    public function updatePetType(Request $request, $id)
    {
        $petType = PetTypes::find($id);

        if (!$petType) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $petType->update($request->all());

        return response()->json($petType);
    }

    // DELETE pet type
    public function deletePetType($id)
    {
        $petType = PetTypes::find($id);

        if (!$petType) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $petType->delete();

        return response()->json(['message' => 'Deleted']);
    }
}