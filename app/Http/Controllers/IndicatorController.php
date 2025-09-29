<?php

namespace App\Http\Controllers;

use App\Http\Resources\IndictatorResource;
use App\Models\Bet;
use App\Models\Bit;
use App\Models\Indicator;
use App\Models\User;

class IndicatorController extends Controller
{
    protected $deltaBit = 50;

    protected $deltaEvents = 2;

    protected $deltaUsers = 12;

    public function index()
    {
        $bits = Bit::query()->sum('sum');

        $events = Bet::query()->count();

        $users = User::query()->count();

        $indicators = Indicator::query()->latest()->first();

        if (!$indicators)
        {
            $indicators = Indicator::create([
                'bits'   => $bits,
                'events' => $events,
                'users'  => $users,
            ]);
        }
        else
        {
            $indicators->update([
                'bits' => $bits > $indicators->bits
                    ? $bits
                    : $indicators->bits + $this->deltaBit,
                'events' => $events > $indicators->events
                    ? $events
                    : $indicators->events + $this->deltaEvents,
                'users' => $users > $indicators->users
                    ? $users
                    : $indicators->users + $this->deltaUsers,
            ]);
        }

        return IndictatorResource::make($indicators);
    }
}
