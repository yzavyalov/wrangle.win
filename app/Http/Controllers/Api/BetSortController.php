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
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class BetSortController extends Controller
{
    public function myBets($paginate)
    {
        $user = Auth::user();

        $bets = $user->mybets()->paginate($paginate);

        $bets = BetResource::collection($bets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My bets',compact('bets','user'));
    }

    public function favoriteBets($paginate)
    {
        $user = Auth::user();

        $bets = $user->favoriteBets()->paginate($paginate);

        $bets = BetResource::collection($bets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My favorite bets',compact('bets','user'));
    }


    public function searchBet(BetSearchRequest $request, $paginate)
    {
        $data = $request->validated();

        $filter = app()->make(BetFilter::class, ['queryParams' => array_filter($data)]);

        $bets= Bet::filter($filter)
            ->where('status',BetStatusEnum::APPROVED)
            ->where('finish','>=',now())
            ->paginate($paginate);

        $bets = BetResource::collection($bets);
        $user = CurrentUserResource::make(Auth::user());

        return $this->successJsonAnswer200('Bets',compact('bets','user'));
    }


    public function finishBet($paginate)
    {
        $bets = Bet::query()->where('status',2)->paginate($paginate);

        return $this->successJsonAnswer200('Ended bets.',BetResource::collection($bets));
    }

    public function hotBets($paginate)
    {
        $bets = Bet::query()
            ->where('status', BetStatusEnum::APPROVED)
            ->whereBetween('finish', [
                Carbon::today(),              // сегодня с 00:00:00
                Carbon::tomorrow()->endOfDay() // завтра до 23:59:59
            ])
            ->paginate($paginate);

        $bets = BetResource::collection($bets);

        return $this->successJsonAnswer200('Bets',compact('bets'));
    }
}
