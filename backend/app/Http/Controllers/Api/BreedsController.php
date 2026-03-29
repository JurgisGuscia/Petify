<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Breeds;
use Illuminate\Http\Request;

class BreedsController extends Controller
{
    // GET all breeds
    public function getAllBreeds()
    {
        return response()->json(Breeds::all());
    }

    // GET single breed
    public function getBreed($id)
    {
        $breed = Breeds::find($id);

        if (!$breed) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($breed);
    }

    // CREATE breed
    public function saveBreed(Request $request)
    {
        $breed = Breeds::create($request->all());

        return response()->json($breed, 201);
    }

    // UPDATE breed
    public function updateBreed(Request $request, $id)
    {
        $breed = Breeds::find($id);

        if (!$breed) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $breed->update($request->all());

        return response()->json($breed);
    }

    // DELETE breed
    public function deleteBreed($id)
    {
        $breed = Breeds::find($id);

        if (!$breed) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $breed->delete();

        return response()->json(['message' => 'Deleted']);
    }
}