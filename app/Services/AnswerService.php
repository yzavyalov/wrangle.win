<?php

namespace App\Services;



use App\Models\Answers;

class AnswerService
{
    public static function profit(Answers $answer)
    {
        $bet = $answer->bet;

        $answerBudget = $answer->bits()->pluck('sum')->sum();

        $budget = $bet->bits()->pluck('sum')->sum()*(1-env('SERVICE_RATE'));

        $dohod = $budget - $answerBudget;

        if ($answerBudget === 0)
            return 0;
        else
            return $dohod/$answerBudget;
    }
}
