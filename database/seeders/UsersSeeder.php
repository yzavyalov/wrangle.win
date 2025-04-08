<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()
            ->count(55)
            ->create()
            ->each(function ($user){
                $user->balance()->create(['balance' => 0]);
            });
    }
}
