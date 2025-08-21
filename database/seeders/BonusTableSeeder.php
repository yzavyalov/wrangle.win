<?php

namespace Database\Seeders;

use App\Http\Enums\BonusModelEnum;
use App\Http\Enums\BonusTypeEnum;
use App\Models\Bonus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BonusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'title' => 'registration bonus',
                'type' => BonusTypeEnum::DISPOSABLE->value,
                'description' => 'The bonus is credited upon email confirmation.',
                'amount' => 50,
                'amount_type' => BonusModelEnum::MONEY->value,
            ],
        ];

        foreach ($data as $bonus)
        {
            $admin = Bonus::firstOrCreate(['title' => $bonus['title']], $bonus);

            $this->command->info('Bonus was created.');
        }
    }
}
