<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bet>
 */
class BetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => random_int(3, 55),
            'title' => fake()->text(190),
            'image' => fake()->imageUrl(200, 200, 'business', true, 'Logo'), // Путь к изображению
            'status' => random_int(1, 5),
            'source1' => fake()->url(), // Случайная ссылка
            'source2' => fake()->url(), // Случайная ссылка
            'description' => fake()->text(),
            'finish' => fake()->dateTimeBetween('-1 year', '+1 year'),
        ];
    }
}
