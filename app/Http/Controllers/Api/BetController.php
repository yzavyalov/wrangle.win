<?php

namespace App\Http\Controllers\Api;

use App\Enum\BetStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Resources\BetResource;
use App\Models\Bet;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bets = Bet::query()
            ->where('status',BetStatusEnum::APPROVED)
            ->where('finish','>=',Carbon::make(now()))
            ->get();

        return $this->successJsonAnswer200('allbets',BetResource::collection($bets));
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
