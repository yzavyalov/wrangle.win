<?php

namespace Database\Seeders;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class PaymentWintecaSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'Winteca',
                'type' => PaymentTypeEnum::ACQUIRING,
                'category' => PaymentCategoryEnum::IN,
                'commission' => 11,
                'fix_fee' => 0.5,
                'logo' => 'logo.png',
                'link' => 'https://portal.winteca.com/login',
                'function' => 'createWintecaDeposit',
            ],
            [
                'name' => 'Winteca',
                'type' => PaymentTypeEnum::ACQUIRING,
                'category' => PaymentCategoryEnum::OUT,
                'commission' => 5,
                'fix_fee' => 0.5,
                'logo' => 'logo.png',
                'link' => 'https://portal.winteca.com/login',
            ],
        ];

        foreach ($data as $item) {
            Payment::firstOrCreate(
                [
                    'name' => $item['name'],
                    'type' => $item['type'],
                    'category' => $item['category'],
                ],
                $item
            );
        }
    }
}

