<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\BetCategory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesTableSeeder::class);
        $this->call(AdminUserSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(BetCategorySeeder::class);
        $this->call(BetSeeder::class);
        $this->call(BitSeeder::class);
        $this->call(TransactionSeeder::class);
        $this->call(PaymentSeeder::class);
        $this->call(PaymentAlphaPoSeeder::class);
    }
}
