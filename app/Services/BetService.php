<?php

namespace App\Services;

use App\Enum\TransactionMethodEnum;
use App\Http\Controllers\Front\PageController;
use App\Http\Enums\BetStatusEnum;
use App\Http\Requests\BetRequest;
use App\Models\Bet;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class BetService
{
    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }
    public function createBet(BetRequest $request)
    {
        $verificateData = $request->validated();

        $bet = new Bet();

        $bet->user_id = Auth::id();

        $bet->title = $verificateData['title'];

        if ($request->hasFile('image'))
        {
            $file = $request->file('image');
            // Сохранение файла в хранилище после валидации
            $filename = uniqid() . '_' . $file->getClientOriginalName();

//            $filePath = $file->storeAs('public/images', $filename);
            $filePath = $file->storeAs('images', $filename, 'public');
            // Сохранение относительного пути в базу данных
            $bet->image = str_replace('public/', '', $filePath);
        }

        $bet->status = BetStatusEnum::CREATED;

        $bet->source1 = $verificateData['source1'];

        if ($request->hasFile('source2'))
            $bet->source2 = $verificateData['source2'];

        if ($request->hasFile('source3'))
            $bet->source2 = $verificateData['source3'];

        $bet->description = $verificateData['description'];

        $bet->finish = $verificateData['finish'];

        $bet->save();

        $bet->categories()->attach($verificateData['categories']);

        foreach ($verificateData['answers'] as $answer) {
            $bet->answers()->create(['description' => $answer]);
        }

        return $bet;
    }


    public function editBet(BetRequest $request, $id)
    {
        $bet = Bet::query()->find($id);

        $validateData = $request->validated();

        $bet->update($validateData);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = uniqid() . '_' . $file->getClientOriginalName();

            // Проверяем, есть ли старая картинка перед удалением
            if (!empty($bet->image) && Storage::disk('public')->exists($bet->image)) {
                Storage::disk('public')->delete($bet->image);
            }

            // Сохранение нового файла
            $filePath = $file->storeAs('images', $filename, 'public');

            // Обновление записи в БД
            $bet->image = $filePath;
            $bet->save();
        }

        $bet->categories()->sync($validateData['categories']);

        $this->updateAnswers($bet,$validateData['answers']);

        if ($request->has('status') && $bet->status !== BetStatusEnum::PAID && (int) $validateData['status'] === BetStatusEnum::PAID->value) {

            $this->paidBet($bet);
        }

        return $bet;
    }



    protected function updateAnswers(Bet $bet, array $answers)
    {
        $existingAnswers = $bet->answers->toArray(); // Получаем ID существующих ответов

        $descriptions = array_column($existingAnswers, 'description','id');

        $newAnswerIds = [];

        foreach ($answers as $answer) {
            if (in_array($answer, $descriptions)) {
                // Обновляем существующий ответ
                $oldAnswer = $bet->answers()->find(array_search($answer, $descriptions));
                if ($oldAnswer) {
                    $oldAnswer->update(['description' => $answer]);
                    $newAnswerIds[] = $oldAnswer->id;
                }
            } else {
                // Создаем новый ответ
                $newAnswer = $bet->answers()->create(['description' => $answer]);
                $newAnswerIds[] = $newAnswer->id;
            }
        }

        // Удаляем ответы, которых нет в новом списке
        $bet->answers()->whereNotIn('id', $newAnswerIds)->delete();
    }

    public static function checkFinishDate($bitId)
    {
        $bet = Bet::query()->find($bitId);

        if (now() <= Carbon::parse($bet->finish))
            return true;
        else
            return false;
    }

    public function paidBet(Bet $bet)
    {
        $allMoney =$this->allmoneyBet($bet);

        $budget = $allMoney * (1-env('SERVICE_RATE'));

        $ownerRewards = $this->betOwnerMoney($bet, $allMoney);

        $answerWin = $bet->winnerAnswer;

        $profit = AnswerService::profit($answerWin);

        $answerWinBits = $answerWin->bits;

        foreach ($answerWinBits as $winBit)
        {
            $userID = $winBit->user_id;

            if ($profit === 0)
                $sum = $winBit->sum * (1-env('SERVICE_RATE'));
            else
                $sum = $winBit->sum*$profit+$winBit->sum;

            $comment = 'Your winnings on the dispute'.$bet->title;

            $this->transactionService->debit($userID, $sum, $comment, TransactionMethodEnum::BIT);
        }

        //находим ставки итого, ставки которые поставили на выиграшный ответ, высчитываем разницу. Дальше разницу
    }

    protected function allmoneyBet($bet)
    {
        return $bet->bits()->sum('sum');
    }

    protected function betOwnerMoney(Bet $bet, $allMoney)
    {
        $owner = $bet->owner;

        $reward = $allMoney * 0.05;

        $transaction = $this->transactionService->debit($owner->id, $reward,'reward for your bet id='.$bet->is.' title = '.$bet->title);

        return $transaction->sum;
    }

    public function delBet($id)
    {
        $bet = Bet::query()->find($id);

        if ($bet) {
            // Удалить файл изображения, если существует
            if ($bet->image && Storage::disk('public')->exists($bet->image)) {
                Storage::disk('public')->delete($bet->image);
            }

            // Отвязать категории
            $bet->categories()->detach();

            // Удалить саму ставку
            $bet->delete();
        }
    }






}
