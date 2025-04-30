<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\BetStatusEnum;
use App\Http\Filters\BetFilter;
use App\Http\Requests\BetSearchRequest;
use App\Http\Resources\BetResource;
use App\Http\Resources\CurrentUserResource;
use App\Http\Resources\UserResource;
use App\Models\Bet;
use Illuminate\Support\Facades\Auth;

class BetSortController extends Controller
{
    public function myBets()
    {
        $user = Auth::user();

        $bets = $user->mybets;

        $bets = BetResource::collection($bets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My bets',compact('bets','user'));
    }

    public function favoriteBets()
    {
        $user = Auth::user();

        $bets = $user->favoriteBets;

        $bets = BetResource::collection($bets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My favorite bets',compact('bets','user'));
    }


    public function searchBet(BetSearchRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(BetFilter::class, ['queryParams' => array_filter($data)]);

        $bets= Bet::filter($filter)
            ->where('status',BetStatusEnum::APPROVED)
            ->where('finish','>=',now())
            ->get();

        $bets = BetResource::collection($bets);
        $user = CurrentUserResource::make(Auth::user());

        return $this->successJsonAnswer200('Bets',compact('bets','user'));
    }


    public function finishBet()
    {
        $bets = Bet::query()->where('status',2)->get();

        return $this->successJsonAnswer200('Ended bets.',BetResource::collection($bets));
    }
}
