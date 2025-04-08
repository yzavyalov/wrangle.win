<?php

namespace Database\Seeders;

use App\Models\Answers;
use App\Models\Bet;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bet::factory()
            ->count(50)
            ->has(Answers::factory()->count(3), 'answers') // Создаём 3 ответа на каждую ставку
            ->create()
            ->each(function ($bet) {
                $categories = \App\Models\BetCategory::inRandomOrder()->limit(rand(1, 3))->pluck('id');
                $bet->categories()->attach($categories);
            })
            ->each(function ($bet) {
                // Выбираем случайный ответ как победителя
                $winner = $bet->answers()->inRandomOrder()->first();
                if ($winner) {
                    $bet->update(['winner_answer_id' => $winner->id]);
                }
            });
    }
}
