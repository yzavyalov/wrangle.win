<?php

namespace Database\Seeders;

use App\Models\Bit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Bit::factory()
            ->count(2000)
            ->create();
    }
}
