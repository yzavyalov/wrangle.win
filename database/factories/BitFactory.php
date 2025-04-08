<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bit>
 */
class BitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bet = \App\Models\Bet::inRandomOrder()->first(); // Берём случайную ставку

        if (!$bet) {
            throw new \Exception("Нет доступных ставок (Bet) для генерации данных.");
        }

        return [
            'answer_id' => $bet->answers()->pluck('id')->random(), // Берём случайный id ответа
            'user_id' => \App\Models\User::pluck('id')->random(), // Берём случайного пользователя
            'sum' => random_int(1, 150), // Случайная сумма
            'bet_id' => $bet->id, // ID случайной ставки
        ];
    }
}
