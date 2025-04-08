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
            'name' => 'Admin',
            'email' => 'andriihorban74@gmail.com',
            'email_verified_at' => now(),
            'password' => bcrypt('Horban1#'),
        ];

        $admin = User::firstOrCreate(['email' => $userData['email']],$userData);

        $admin->assignRole(['admin','finance manager']);

        $this->command->info('Администратор создан и роль назначена.');
    }
}
