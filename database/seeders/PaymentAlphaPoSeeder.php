<?php

namespace Database\Seeders;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class PaymentAlphaPoSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'name' => 'AlphaPo',
                'type' => PaymentTypeEnum::CRYPTO,
                'category' => PaymentCategoryEnum::IN,
                'commission' => 2,
                'fix_fee' => 0,
                'logo' => 'logo.png',
                'link' => 'https://app.alphapo.net/static/cdn/apiDocumentation.pdf',
                'function' => 'createAlphaPoDeposit',
            ],
            [
                'name' => 'AlphaPo',
                'type' => PaymentTypeEnum::CRYPTO,
                'category' => PaymentCategoryEnum::OUT,
                'commission' => 2,
                'fix_fee' => 0,
                'logo' => 'logo.png',
                'link' => 'https://app.alphapo.net/static/cdn/apiDocumentation.pdf',
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

