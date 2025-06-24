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
        Schema::create('winteca_transactions', function (Blueprint $table) {
            $table->id();

            // Полиморфная связь вручную
            $table->unsignedBigInteger('transactionable_id');
            $table->string('transactionable_type');

            // Явное указание короткого имени индекса
            $table->index(['transactionable_type', 'transactionable_id'], 'txn_type_id_index');

            $table->string('id_winteca');
            $table->string('status');
            $table->string('resolution')->nullable();
            $table->float('amount')->nullable();
            $table->float('payment_amount')->nullable();
            $table->float('deposit')->nullable();
            $table->string('currency')->nullable();
            $table->string('reference_id')->nullable();
            $table->string('fee')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('winteca_transactions');
    }
};
