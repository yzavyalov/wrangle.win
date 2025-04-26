<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TopUpBalanceRequest;
use App\Models\Answers;
use App\Services\BalanceService;
use App\Services\BetService;
use App\Services\BitService;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class BitController extends Controller
{
    public function __construct(BitService $bitService, TransactionService $transactionService)
    {
        $this->bitService = $bitService;

        $this->transactionService = $transactionService;

    }
    public function createBit($answer_id, TopUpBalanceRequest $request)
    {
        $validateData = $request->validated();
        $sum = $validateData['sum'];

        $answer = Answers::query()->find($answer_id);

        // Проверка на существование ответа
        if (!$answer) {
            return $this->errorJsonAnswer404('Answer not found.');
        }

        // Отдельно проверка на окончание времени
        if (!BetService::checkFinishDate($answer->bet_id)) {
            return $this->errorJsonAnswer400('Betting time is over.');
        }

        // Отдельно проверка на достаточность средств
        if (!BalanceService::checkSum($sum)) {
            return $this->errorJsonAnswer400('Insufficient balance. Please top up your balance.');
        }

        // Если всё ок — создаём ставку
        $bit = $this->bitService->createBit($answer_id, $sum);

        $this->transactionService->creditBit($sum, 'You placed a bet on bet id = ' . $bit->bet_id);

        return $this->successJsonAnswer204('Your bet has been accepted!');
    }

}
