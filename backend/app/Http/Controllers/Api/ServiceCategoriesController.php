<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceCategories;
use Illuminate\Http\Request;

class ServiceCategoriesController extends Controller
{
    // GET all categories
    public function getAllServiceCategories()
    {
        return response()->json(ServiceCategories::all());
    }

    // GET single category
    public function getServiceCategory($id)
    {
        $category = ServiceCategories::find($id);

        if (!$category) {
            return response()->json(['message' => 'Not found'], 404);
        }

        return response()->json($category);
    }

    // CREATE category
    public function saveServiceCategory(Request $request)
    {
        $category = ServiceCategories::create($request->all());

        return response()->json($category, 201);
    }

    // UPDATE category
    public function updateServiceCategory(Request $request, $id)
    {
        $category = ServiceCategories::find($id);

        if (!$category) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $category->update($request->all());

        return response()->json($category);
    }

    // DELETE category
    public function deleteServiceCategory($id)
    {
        $category = ServiceCategories::find($id);

        if (!$category) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Deleted']);
    }
}