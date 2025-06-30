<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Traits\HasRoles;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    use HasRoles;

    public function run(): void
    {
        $userData = [
           [
            'name' => 'Nikita',
            'email' => 'ceo@winteca.com',
            'email_verified_at' => now(),
            'password' => bcrypt('Nikita1#'),
           ],
           [
               'name' => 'Yaroslav',
               'email' => '8540462@gmail.com',
               'email_verified_at' => now(),
               'password' => bcrypt('Admin1#'),
           ],
            [
                'name' => 'Konstantin',
                'email' => 'konstantin@winteca.com',
                'email_verified_at' => now(),
                'password' => bcrypt('Admin3#'),
            ],
            [
                'name' => 'Roman',
                'email' => 'Kostromichov.roman@gmail.com',
                'email_verified_at' => now(),
                'password' => bcrypt('Admin4!'),
            ],
        ];

        foreach ($userData as $user)
        {
            $admin = User::firstOrCreate(['email' => $user['email']], $user);

            $admin->assignRole(['admin', 'finance manager']);

            $this->command->info('Администратор создан и роль назначена.');
        }
    }
}
