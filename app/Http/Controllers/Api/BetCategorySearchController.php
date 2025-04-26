<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\BetCategoryFilter;
use App\Http\Requests\BetCategoryRequest;
use App\Http\Resources\BetCategoryResource;
use App\Models\BetCategory;
use Illuminate\Http\Request;

class BetCategorySearchController extends Controller
{

    public function searchCategory(BetCategoryRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(BetCategoryFilter::class, ['queryParams' => array_filter($data)]);

        $categories= BetCategory::filter($filter)->get();

        return $this->successJsonAnswer200('Categories',BetCategoryResource::collection($categories));
    }
}
