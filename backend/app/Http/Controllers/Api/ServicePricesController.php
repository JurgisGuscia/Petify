<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServicePrices;
use Illuminate\Http\Request;

class ServicePricesController extends Controller
{
    // GET all service prices
    public function getAllServicePrices()
    {
        return response()->json(ServicePrices::all());
    }

    // GET single service price
    public function getServicePrice($id)
    {
        $price = ServicePrices::find($id);

        if (!$price) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($price);
    }

    // CREATE service price
    public function saveServicePrice(Request $request)
    {
        $price = ServicePrices::create($request->all());

        return response()->json($price, 201);
    }

    // UPDATE service price
    public function updateServicePrice(Request $request, $id)
    {
        $price = ServicePrices::find($id);

        if (!$price) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $price->update($request->all());

        return response()->json($price);
    }

    // DELETE service price
    public function deleteServicePrice($id)
    {
        $price = ServicePrices::find($id);

        if (!$price) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $price->delete();

        return response()->json(['message' => 'Deleted']);
    }
}