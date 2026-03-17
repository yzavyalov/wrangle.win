<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('crypto_wallets', function (Blueprint $table) {
            if (Schema::hasColumn('crypto_wallets', 'foreign_id')) {
                $table->dropColumn('foreign_id');
            }

            if (Schema::hasColumn('crypto_wallets', 'convert_to')) {
                $table->dropColumn('convert_to');
            }

            if (Schema::hasColumn('crypto_wallets', 'tag')) {
                $table->dropColumn('tag');
            }

            if (!Schema::hasColumn('crypto_wallets', 'payment_methods_id')) {
                $table->foreignId('payment_methods_id')
                    ->after('user_id')
                    ->constrained('payment_methods');
            }
        });
    }

    public function down(): void
    {
        Schema::table('crypto_wallets', function (Blueprint $table) {
            if (Schema::hasColumn('crypto_wallets', 'payment_methods_id')) {
                $table->dropForeign(['payment_methods_id']);
                $table->dropColumn('payment_methods_id');
            }

            if (!Schema::hasColumn('crypto_wallets', 'foreign_id')) {
                $table->string('foreign_id')->nullable()->after('user_id');
            }

            if (!Schema::hasColumn('crypto_wallets', 'convert_to')) {
                $table->string('convert_to')->nullable()->after('currency');
            }

            if (!Schema::hasColumn('crypto_wallets', 'tag')) {
                $table->string('tag')->nullable()->after('address');
            }
        });
    }
};
