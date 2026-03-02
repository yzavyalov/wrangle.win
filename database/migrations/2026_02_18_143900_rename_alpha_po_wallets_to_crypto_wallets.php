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
        Schema::rename('alpha_po_wallets', 'crypto_wallets');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('crypto_wallets', 'alpha_po_wallets');
    }
};
