<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\BetStatusEnum;
use App\Http\Requests\PaginateRequest;
use App\Http\Resources\BetResource;
use App\Http\Resources\CurrentUserResource;
use App\Models\Bet;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class OwnBetController extends Controller
{
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function myBets(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15); // по умолчанию 15
        $page = $request->input('page', 1);

        $user = Auth::user();

        $bets = $user->mybets()->paginate($perPage, ['*'], 'page', $page);

        $bets = BetResource::collection($bets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My bets',compact('bets','user'));
    }

    public function delMyBet($id)
    {
        $bet = Bet::query()->findOrFail($id);

        if ($bet->user_id !== Auth::id())
            return $this->errorJsonAnswer403('It\'s not your bet!');

        if ($bet->status === BetStatusEnum::DELETED->value)
            return $this->errorJsonAnswer403('This was already delete!');

        $bet->list = 1;

        $bet->save();

        return $this->successJsonAnswer200('The event was deleted!');
    }
}
