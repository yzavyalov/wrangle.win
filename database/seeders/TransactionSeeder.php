<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Transaction::factory()
            ->count(1500)
            ->create()
            ->each(function ($transaction){
                $user = User::find($transaction->user_id)->balance()->update(['balance' => $transaction->remaining]);
            });
    }
}
