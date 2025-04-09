<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\BetCategoryCreateRequest;
use App\Http\Requests\BetRequest;
use App\Http\Resources\BetCategoryResource;
use App\Models\BetCategory;
use Illuminate\Http\Request;

class BetCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = BetCategory::orderBy('name')->get();

        return $this->successJsonAnswer200('bets\' categories',BetCategoryResource::collection($categories));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BetCategoryCreateRequest $request)
    {
        $validateData = $request->validated();

        $category = BetCategory::create($validateData);

        return $this->successJsonAnswer200('Your category',BetCategoryResource::make($category));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = BetCategory::query()->findOrFail($id);

        return $this->successJsonAnswer200('category',BetCategoryResource::make($category));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
