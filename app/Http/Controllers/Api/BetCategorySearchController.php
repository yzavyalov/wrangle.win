<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Filters\BetCategoryFilter;
use App\Http\Requests\BetCategoryRequest;
use App\Http\Resources\BetCategoryResource;
use App\Models\BetCategory;
use App\Services\UserService;
use Illuminate\Http\Request;

class BetCategorySearchController extends Controller
{

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function searchCategory(BetCategoryRequest $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 15);

        $data = $request->validated();

        $filter = app()->make(BetCategoryFilter::class, ['queryParams' => array_filter($data)]);

        $categories= BetCategory::filter($filter)->paginate($perPage, ['*'], 'page', $page);;

        return $this->successJsonAnswer200('Categories',BetCategoryResource::collection($categories));
    }
}
