<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AvailableServices;
use Illuminate\Http\Request;

class AvailableServicesController extends Controller
{
    // GET all services
    public function getAllAvailableServices()
    {
        return response()->json(AvailableServices::all());
    }

    // GET single service
    public function getAvailableService($id)
    {
        $service = AvailableServices::find($id);

        if (!$service) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($service);
    }

    // CREATE new service
    public function saveAvailableService(Request $request)
    {
        $service = AvailableServices::create($request->all());

        return response()->json($service, 201);
    }

    // UPDATE service
    public function updateAvailableService(Request $request, $id)
    {
        $service = AvailableServices::find($id);

        if (!$service) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $service->update($request->all());

        return response()->json($service);
    }

    // DELETE service
    public function deleteAvailableService($id)
    {
        $service = AvailableServices::find($id);

        if (!$service) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Deleted']);
    }
}