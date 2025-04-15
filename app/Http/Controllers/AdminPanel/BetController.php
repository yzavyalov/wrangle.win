<?php

namespace App\Http\Controllers\AdminPanel;

use App\Http\Controllers\Controller;
use App\Http\Requests\BetRequest;
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

        return view('admin-panel.bets.allbetstable',compact('bets'));
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
}
