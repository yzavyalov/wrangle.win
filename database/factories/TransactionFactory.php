<?php

namespace Database\Factories;

use App\Models\User;
use App\Services\BalanceService;
use App\Services\TransactionService;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sum = random_int(1, 150); // Создаём сумму
        $operation = random_int(1, 3); // Создаём операцию
        $userId = User::pluck('id')->random();

        return [
            'user_id' => $userId,
            'operation' => $operation,
            'status' => random_int(1, 6),
            'method' => random_int(1, 5),
            'sum' => $sum,
            'remaining' => app(TransactionService::class)->calculationBalance($sum, $operation, $userId), // Передаём переменные
            'comment' => 'Seeder test',
        ];
    }
}
