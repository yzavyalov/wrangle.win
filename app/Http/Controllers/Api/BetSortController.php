<?php

namespace App\Http\Controllers\Api;

use App\Enum\BetStatusEnum;
use App\Http\Controllers\Controller;
use App\Http\Filters\BetFilter;
use App\Http\Requests\BetSearchRequest;
use App\Http\Resources\BetResource;
use App\Models\Bet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BetSortController extends Controller
{
    public function myBets()
    {
        $user = Auth::user();

        $bets = $user->mybets;

        return $this->successJsonAnswer200('My bets',BetResource::collection($bets));
    }

    public function favoriteBets()
    {
        $user = Auth::user();

        $bets = $user->favoriteBets;

        return $this->successJsonAnswer200('My favorite bets',BetResource::collection($bets));
    }


    public function searchBet(BetSearchRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(BetFilter::class, ['queryParams' => array_filter($data)]);

        $bets= Bet::filter($filter)
            ->where('status',BetStatusEnum::APPROVED)
            ->where('finish','>=',now())
            ->get();

        return $this->successJsonAnswer200('Bets',BetResource::collection($bets));
    }
}
