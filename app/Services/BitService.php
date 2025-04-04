<?php

namespace App\Services;


use App\Models\Answers;
use App\Models\Bit;
use Illuminate\Support\Facades\Auth;

class BitService
{
    public function createBit($answerId,$sum)
    {
        $answer = Answers::query()->find($answerId);

        $bit = Bit::create([
            'answer_id' => $answerId,
            'user_id' => Auth::id(),
            'sum' => $sum,
            'bet_id' => $answer->bet->id,
        ]);

        return $bit;
    }
}
