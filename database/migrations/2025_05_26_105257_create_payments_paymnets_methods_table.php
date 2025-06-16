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
        Schema::create('payments_payments_methods_table', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id')->constrained('payments');
            $table->foreignId('payment_method_id')->constrained('payment_methods');
            $table->integer('FTD')->default(1);
            $table->integer('FTD_limits')->nullable();
            $table->integer('STD')->default(1);
            $table->integer('STD_limits')->nullable();
            $table->integer('order_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments_payments_methods_table');
    }
};
