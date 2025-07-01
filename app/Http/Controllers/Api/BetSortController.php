<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Enums\BetStatusEnum;
use App\Http\Filters\BetFilter;
use App\Http\Requests\BetSearchRequest;
use App\Http\Requests\CarouselRequest;
use App\Http\Requests\PaginateRequest;
use App\Http\Resources\BetResource;
use App\Http\Resources\CurrentUserResource;
use App\Models\Bet;
use App\Services\UserService;
use Illuminate\Support\Carbon;


class BetSortController extends Controller
{
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    public function searchBet(BetSearchRequest $request)
    {
        $page = $request->query('page', 1);
        $perPage = $request->query('per_page', 15);

        $data = $request->validated();

        $filter = app()->make(BetFilter::class, ['queryParams' => array_filter($data)]);

        $bets= Bet::filter($filter)
            ->where('status',BetStatusEnum::APPROVED)
            ->where('finish','>=',now())
            ->orderBy('finish', 'asc')   // Добавляем сортировку по finish по возрастанию
            ->paginate($perPage, ['*'], 'page', $page);

        $bets = BetResource::collection($bets);

        $user = $this->userService->getUserFromToken($request);

        if ($user)
            $user = CurrentUserResource::make($user);
        else
            $user = null;

        return $this->successJsonAnswer200('Bets',compact('bets','user'));
    }


    public function finishBet(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15); // по умолчанию 15
        $page = $request->input('page', 1);

        $bets = Bet::query()->where('status',2)->paginate($perPage, ['*'], 'page', $page);

        return $this->successJsonAnswer200('Ended bets.',BetResource::collection($bets));
    }

    public function hotBets(PaginateRequest $request)
    {
        $perPage = $request->input('per_page', 15); // по умолчанию 15
        $page = $request->input('page', 1);

        $bets = Bet::query()
            ->where('status', BetStatusEnum::APPROVED)
            ->whereBetween('finish', [
                Carbon::today(),              // сегодня с 00:00:00
                Carbon::tomorrow()->endOfDay() // завтра до 23:59:59
            ])
            ->orderBy('finish', 'asc')   // Добавляем сортировку по finish по возрастанию
            ->paginate($perPage, ['*'], 'page', $page);

        $bets = BetResource::collection($bets);

        return $this->successJsonAnswer200('Bets',compact('bets'));
    }

    public function carousel(CarouselRequest $request)
    {
        $data = $request->validated();

        $currencyId = $data['current_id'];

        if ($data['direction'] === 'next')
        {
            $bet = Bet::query()
                ->where('id', '>', $currencyId)
                ->where('status',BetStatusEnum::APPROVED)
                ->where('finish','>=', \Carbon\Carbon::make(now()))
                ->orderBy('id', 'asc')
                ->first();

            if (!$bet)
            {
                // Если следующего нет — берем самый первый
                $bet = Bet::query()
                    ->where('status',BetStatusEnum::APPROVED)
                    ->where('finish','>=', \Carbon\Carbon::make(now()))
                    ->orderBy('id', 'asc')
                    ->first();
            }
        }
        else
        {
            $bet = Bet::query()
                ->where('id', '<', $currencyId)
                ->where('status',BetStatusEnum::APPROVED)
                ->where('finish','>=', \Carbon\Carbon::make(now()))
                ->orderBy('id', 'desc')
                ->first();

            if (!$bet) {
                // Если предыдущего нет — берем самый последний
                $bet = Bet::query()
                    ->where('status',BetStatusEnum::APPROVED)
                    ->where('finish','>=', \Carbon\Carbon::make(now()))
                    ->orderBy('id', 'desc')
                    ->first();
            }
        }

        return $this->successJsonAnswer200($data['direction'].'bet',BetResource::make($bet));
    }


}
