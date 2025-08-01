<?php

namespace Database\Seeders;

use App\Http\Enums\PaymentCategoryEnum;
use App\Http\Enums\PaymentTypeEnum;
use App\Models\Payment;
use App\Models\PaymentMethod;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'type' => PaymentTypeEnum::ACQUIRING->value,
                'category' => PaymentCategoryEnum::IN->value,
                'title' => 'Bank cards',
                'logo' => '',
                'currency' => env('CURRENT_CURRENCY'),
            ],
            [
                'type' => PaymentTypeEnum::CRYPTO->value,
                'category' => PaymentCategoryEnum::IN->value,
                'title' => 'Bitcoin',
                'logo' => '',
                'currency' => 'BTC',
            ],
            [
                'type' => PaymentTypeEnum::CRYPTO->value,
                'category' => PaymentCategoryEnum::IN->value,
                'title' => 'USDT ERC20',
                'logo' => '',
                'currency' => 'USDTE',
            ],
            [
                'type' => PaymentTypeEnum::ACQUIRING->value,
                'category' => PaymentCategoryEnum::OUT->value,
                'title' => 'Bank cards',
                'logo' => '',
                'currency' => env('CURRENT_CURRENCY'),
            ],
            [
                'type' => PaymentTypeEnum::CRYPTO->value,
                'category' => PaymentCategoryEnum::OUT->value,
                'title' => 'Bitcoin',
                'logo' => '',
                'currency' => 'BTC',
            ],
            [
                'type' => PaymentTypeEnum::CRYPTO->value,
                'category' => PaymentCategoryEnum::OUT->value,
                'title' => 'USDT ERC20',
                'logo' => '',
                'currency' => 'USDTE',
            ],
        ];

        foreach ($data as $item) {
            PaymentMethod::updateOrCreate(
                [
                    'title' => $item['title'],
                    'type' => $item['type'],
                    'category' => $item['category'],
                    'currency' => $item['currency'],
                ],
                $item
            );
        }

//         2. Связка с существующими платежами по type и category
        $payments = Payment::all();

        foreach ($payments as $payment) {
            $matchingMethods = PaymentMethod::where('type', $payment->type)
                ->where('category', $payment->category)
                ->get();

            foreach ($matchingMethods as $index => $method) {
                $payment->methods()->syncWithoutDetaching([
                    $method->id => [
                        'FTD' => 1,
                        'order_by' => $index + 1, // индекс начинается с 0, добавляем 1
                    ],
                ]);
            }
        }
    }
}
