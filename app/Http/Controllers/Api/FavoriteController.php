<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bet;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function toggleFavorite($betId)
    {
        $user = auth()->user();

        // Переключение состояния (добавить или удалить)
        if ($user->favoriteBets()->where('bet_id', $betId)->exists()) {
            $user->favoriteBets()->detach($betId);
            return $this->successJsonAnswer204('The bet has been removed from favorites.');
        } else {
            $user->favoriteBets()->attach($betId);
            return $this->successJsonAnswer204('The dispute has been added to favorites.');
        }
    }
}
