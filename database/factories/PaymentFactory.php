<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->text(110),
            'type' => random_int(1,5),
            'category' => random_int(1,2),
            'commission' => rand(1, 15),
            'fix_fee' => fake()->randomFloat(2,0,10),
            'logo' => fake()->imageUrl(200, 200, 'business', true, 'Logo'),
            'link' => fake()->url(),
        ];
    }
}
