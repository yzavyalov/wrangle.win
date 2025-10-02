<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Enums\BetStatusEnum;
use App\Http\Filters\BetFilter;
use App\Http\Requests\BetRequest;
use App\Http\Requests\BetSearchRequest;
use App\Http\Resources\BetResource;
use App\Models\Bet;
use App\Models\BetCategory;
use App\Services\BetService;
use Illuminate\Http\Request;

class BetController extends Controller
{
    public function __construct(BetService $betService)
    {
        $this->betService = $betService;
    }


    public function allBets()
    {
        $bets = Bet::paginate(15);

        foreach ($bets as $bet)
        {
            if (!BetService::checkFinishDate($bet->id) && $bet->status === BetStatusEnum::APPROVED->value)
            {
                $bet->status = BetStatusEnum::FINISHED->value;
            }
        }

        $statuses = BetStatusEnum::cases();

        $categories = BetCategory::orderBy('name')->get();

        return view('admin-panel.bets.allbetstable',compact('bets','statuses','categories'));
    }

    public function show($id)
    {
        $bet = Bet::query()->find($id);

        $categories = BetCategory::all();

        return view('admin-panel.bets.bet-show',compact('bet','categories'));
    }

    public function update(BetRequest $request, $id)
    {
        $bet = $this->betService->editBet($request, $id);

        return redirect()->route('bets-all');
    }

    public function del($id)
    {
        $this->betService->delBet($id);

        return redirect()->route('bets-all');
    }

    public function create()
    {
        return view('admin-panel.bets.bet-create-form');
    }

    public function store(BetRequest $request)
    {
        $bet = $this->betService->createBet($request);

        return redirect()->route('bets-all');
    }

    public function selectForm()
    {
        $statuses = BetStatusEnum::cases();

        $categories = BetCategory::orderBy('name')->get();

        return view('admin-panel.bets.bet-select-form',compact('statuses','categories'));
    }

    public function select(BetSearchRequest $request)
    {
        $data = $request->validated();

        $filter = app()->make(BetFilter::class, ['queryParams' => array_filter($data)]);

        $bets= Bet::filter($filter)->paginate(15)->withQueryString();

        if ($request['table'] == 1)
        {
            $statuses = BetStatusEnum::cases();

            $categories = BetCategory::orderBy('name')->get();

            return view('admin-panel.bets.allbetstable',compact('bets','statuses','categories'));
        }
        else
            return view('admin-panel.bets.bets-and-bits-table',compact('bets'));
    }


    public function betsAndBits()
    {
        $bets = Bet::orderBy('created_at', 'desc')->paginate(15);;

        return view('admin-panel.bets.bets-and-bits-table',compact('bets'));
    }

    public function nominateWinner(Request $request)
    {
        $validated = $request->validate([
            'bet_id' => 'required|exists:bets,id',
            'winner_answer_id' => 'required|exists:answers,id',
        ]);

        $bet = Bet::findOrFail($validated['bet_id']);

        if ($bet->status === BetStatusEnum::PAID->value) {
            return redirect()->back()->with('error', 'The reward for this event has already been paid.');
        }

        if ($bet->finish > now())
        {
            // Если уже назначен победитель — обнуляем
            if ($bet->winner_answer_id)
            {
                $bet->winner_answer_id = null;
                $bet->save();
            }

            $bet->winner_answer_id = $validated['winner_answer_id'];
            $bet->save();

            return redirect()->back()->with('success', 'Winner nominated successfully!');
        }
        else
        {
            return redirect()->back()->with('error', 'Finish date has not been reached yet!');
        }
    }

}
