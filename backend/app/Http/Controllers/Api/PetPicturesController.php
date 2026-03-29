<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PetPictures;
use Illuminate\Http\Request;

class PetPicturesController extends Controller
{
    // GET all pictures
    public function getAllPetPictures()
    {
        return response()->json(PetPictures::all());
    }

    // GET single picture
    public function getPetPicture($id)
    {
        $picture = PetPictures::find($id);

        if (!$picture) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($picture);
    }

     // GET pictures by multiple pet IDs
    public function getPetPictures(Request $request)
    {
        $validated = $request->validate([
            'pets_ids' => 'required|array',
            'pets_ids.*' => 'integer|exists:pets,id',
        ]);

        $pictures = PetPictures::whereIn('pets_id', $validated['pets_ids'])
            ->select('pets_id', 'url')
            ->get();

        return response()->json($pictures);
    }
    
    public function getPicturesByPetId($pets_id)
{
    $pictures = PetPictures::where('pets_id', $pets_id)
        ->select('pets_id', 'url')
        ->get();

    if ($pictures->isEmpty()) {
        return response()->json(['message' => 'No pictures found'], 404);
    }

    return response()->json($pictures);
}

    // CREATE picture
    public function savePetPicture(Request $request)
{
    try {
        \Log::info('savePetPicture called', [
            'hasFile' => $request->hasFile('picture'),
            'pets_id' => $request->input('pets_id'),
            'all' => $request->all(),
        ]);

        $validated = $request->validate([
            'picture' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
            'pets_id' => 'required|integer|exists:pets,id',
        ]);

        $path = $request->file('picture')->store('pet-pictures', 'public');

        $picture = PetPictures::create([
            'url' => $path,
            'pets_id' => $validated['pets_id'],
        ]);

        return response()->json([
            'message' => 'Pet picture uploaded successfully',
            'data' => $picture,
        ], 201);
    } catch (\Throwable $e) {
        \Log::error('savePetPicture failed', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ]);

        return response()->json([
            'message' => 'Upload failed',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    // UPDATE picture
    public function updatePetPicture(Request $request, $id)
    {
        $picture = PetPictures::find($id);

        if (!$picture) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'url' => 'sometimes|string',
            'pets_id' => 'sometimes|integer|exists:pets,id',
        ]);

        $picture->update($validated);

        return response()->json($picture);
    }

    // DELETE picture
    public function deletePetPicture($id)
    {
        $picture = PetPictures::find($id);

        if (!$picture) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $picture->delete();

        return response()->json(['message' => 'Deleted']);
    }
}