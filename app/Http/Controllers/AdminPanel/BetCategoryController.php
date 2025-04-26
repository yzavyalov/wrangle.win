<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Filters\BetCategoryFilter;
use App\Http\Requests\BetCategoryRequest;
use App\Models\BetCategory;
use Illuminate\Http\Request;

class BetCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = BetCategory::withCount('bets')->paginate(20);

        return view('admin-panel.categories.bet-categories',compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = BetCategory::query()->find($id);

        return view('admin-panel.categories.edit-bet-category',compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BetCategoryRequest $request, string $id)
    {
        $category = BetCategory::query()->find($id);

        $category->update($request->validated());

        return redirect()->route('bet-categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = BetCategory::query()->find($id);

        if ($category->bets()->count() > 0)
        {
            return redirect()->back()->with('success-message','We can\'t remove this category because there are betas with this category.');
        }
        else
        {
            $category->delete();

            return redirect()->route('bet-categories.index');
        }
    }

    public function searchCategory(BetCategoryRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(BetCategoryFilter::class, ['queryParams' => array_filter($data)]);

        $categories= BetCategory::filter($filter)->paginate(25)->withQueryString();

        return view('admin-panel.categories.bet-categories',compact('categories'));
    }
}
