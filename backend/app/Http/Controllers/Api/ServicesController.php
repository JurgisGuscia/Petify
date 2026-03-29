<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Services;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    // GET all services
    public function getAllServices()
    {
        return response()->json(Services::all());
    }

    // GET single service
    public function getService($id)
    {
        $service = Services::find($id);

        if (!$service) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($service);
    }

    public function getServicesByPet($petId)
    {
        return response()->json(
            Services::where('pet_id', $petId)->get()
        );
    }

    public function getServicesByPets(Request $request)
    {
        $petIds = $request->input('petIds');

        if (!$petIds || !is_array($petIds)) {
            return response()->json(['message' => 'petIds must be an array'], 400);
        }

        return response()->json(
            Services::whereIn('pet_id', $petIds)->get()
        );
    }

    // CREATE service
    public function saveService(Request $request)
    {
        $service = Services::create($request->all());

        return response()->json($service, 201);
    }

    // UPDATE service
    public function updateService(Request $request, $id)
    {
        $service = Services::find($id);

        if (!$service) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $service->update($request->all());

        return response()->json($service);
    }

    // DELETE service
    public function deleteService($id)
    {
        $service = Services::find($id);

        if (!$service) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Deleted']);
    }
}