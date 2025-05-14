<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\BetStatusEnum;
use App\Http\Requests\BetRequest;
use App\Http\Requests\PaginateRequest;
use App\Http\Resources\BetResource;
use App\Models\Bet;
use App\Services\BetService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BetController extends Controller
{

    public function __construct(BetService $betService)
    {
        $this->betService = $betService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15); // по умолчанию 15
        $page = $request->input('page', 1);

        $bets = Bet::query()
            ->where('status',BetStatusEnum::APPROVED)
            ->where('finish','>=',Carbon::make(now()))
            ->paginate($perPage, ['*'], 'page', $page);

        return $this->successJsonAnswer200('allbets',BetResource::collection($bets));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BetRequest $request)
    {
        $bet = $this->betService->createBet($request);

        return $this->successJsonAnswer200('Your bet.',BetResource::make($bet));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bet = Bet::query()->findOrFail($id);

        return $this->successJsonAnswer200('bet',BetResource::make($bet));
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
