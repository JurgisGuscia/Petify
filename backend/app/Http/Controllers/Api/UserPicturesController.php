<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\UserPictures;
use Illuminate\Http\Request;

class UserPicturesController extends Controller

{
    
    public function getAllPictures()
    {
        $pictures = UserPictures::all();

        return response()->json($pictures, 200);
    }

    public function getPicture($id)
{
    $picture = UserPictures::where('users_id', $id)->first();

    if (!$picture) {
        return response()->json([
            'message' => 'Picture not found'
        ], 404);
    }

    return response()->json([
        'id' => $picture->id,
        'users_id' => $picture->users_id,
        'path' => $picture->url,
        'url' => asset('storage/' . $picture->url),
    ], 200);
}

    public function savePicture(Request $request)
{
    $validated = $request->validate([
        'picture' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        'users_id' => 'required|integer|exists:users,id',
    ]);

    $path = $request->file('picture')->store('user-pictures', 'public');

    $picture = UserPictures::create([
        'url' => $path,
        'users_id' => $validated['users_id'],
    ]);

    return response()->json([
        'message' => 'Picture uploaded successfully',
        'data' => [
            'id' => $picture->id,
            'users_id' => $picture->users_id,
            'path' => $picture->url,
            'url' => asset('storage/' . $picture->url),
        ],
    ], 201);
}
    public function updatePicture(Request $request, $id)
    {
        $picture = UserPictures::find($id);

        if (!$picture) {
            return response()->json([
                'message' => 'Picture not found'
            ], 404);
        }

        $validated = $request->validate([
            'url' => 'sometimes|required|string|max:255',
            'users_id' => 'sometimes|required|integer|exists:users,id'
        ]);

        $picture->update($validated);

        return response()->json([
            'message' => 'Picture updated successfully',
            'data' => $picture
        ], 200);
    }

    public function deletePicture($id)
    {
        $picture = UserPictures::find($id);

        if (!$picture) {
            return response()->json([
                'message' => 'Picture not found'
            ], 404);
        }

        $picture->delete();

        return response()->json([
            'message' => 'Picture deleted successfully'
        ], 200);
    }
}