<?php

namespace App\Services;



use App\Models\Answers;
use App\Models\Bet;

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

    public static function procentage(Bet $bet, Answers $answer)
    {
        $total = max(1, $bet->answers->sum(fn($a) => $a->bits()->pluck('sum')->sum())); // Чтобы не было деления на 0

        $rateSum = $answer->bits()->pluck('sum')->sum();

        $procentage = ($rateSum / $total) * 100;

        return $procentage;

    }

}
