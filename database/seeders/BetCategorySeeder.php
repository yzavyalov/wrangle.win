<?php

namespace Database\Seeders;

use App\Models\BetCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BetCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BetCategory::factory()
            ->count(30)
            ->create();
    }
}
