<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestAcсountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data =  [
            [
            'name' => 'Test Account',
            'email' => 'operator@wrangle.win',
            'email_verified_at' => now(),
            'password' => bcrypt('TestAccount3#'),
                ],
        ];

        foreach ($data as $user)
        {
            $test = User::firstOrCreate(['email' => $user['email']], $user);

            $this->command->info('Тестовый аккаунт создан.');
        }
    }
}
