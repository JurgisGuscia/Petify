<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PriceProfiles;
use Illuminate\Http\Request;

class PriceProfilesController extends Controller
{
    // GET all price profiles
    public function getAllPriceProfiles()
    {
        return response()->json(PriceProfiles::all());
    }

    // GET single price profile
    public function getPriceProfile($id)
    {
        $profile = PriceProfiles::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($profile);
    }

    // CREATE price profile
    public function savePriceProfile(Request $request)
    {
        $profile = PriceProfiles::create($request->all());

        return response()->json($profile, 201);
    }

    // UPDATE price profile
    public function updatePriceProfile(Request $request, $id)
    {
        $profile = PriceProfiles::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $profile->update($request->all());

        return response()->json($profile);
    }

    // DELETE price profile
    public function deletePriceProfile($id)
    {
        $profile = PriceProfiles::find($id);

        if (!$profile) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $profile->delete();

        return response()->json(['message' => 'Deleted']);
    }
}