<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('crypto_wallets', function (Blueprint $table) {
            $table->dropColumn('foreign_id');
            $table->dropColumn('convert_to');
            $table->dropColumn('tag');
            $table->foreignId('payment_methods_id')->after('user_id')->constrained('payment_methods');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('crypto_wallets', function (Blueprint $table) {
            $table->dropForeign(['payment_methods_id']);
            $table->string('foreign_id')->nullable()->after('user_id');
            $table->string('convert_to')->nullable()->after('currency');
            $table->string('tag')->nullable()->after('address');
        });
    }
};
