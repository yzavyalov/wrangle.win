<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaginateRequest;
use App\Http\Resources\BetResource;
use App\Http\Resources\CurrentUserResource;
use Illuminate\Support\Facades\Auth;

class FavouriteBetController extends Controller
{
    public function unionOwnFavBets(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15); // по умолчанию 15

        $page = $request->input('page', 1);

        $user = Auth::user();

        $favbets = $user->favoriteBets()->paginate($perPage, ['*'], 'page', $page);

        $ownbets = $user->mybets()->paginate($perPage, ['*'], 'page', $page);

        $favbets = BetResource::collection($favbets);

        $ownbets = BetResource::collection($ownbets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My favorite bets',compact('favbets','ownbets','user'));
    }


    public function favoriteBets(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15); // по умолчанию 15

        $page = $request->input('page', 1);

        $user = Auth::user();

        $bets = $user->favoriteBets()->paginate($perPage, ['*'], 'page', $page);;

        $bets = BetResource::collection($bets);

        $user = CurrentUserResource::make($user);

        return $this->successJsonAnswer200('My favorite bets',compact('bets','user'));
    }
}
