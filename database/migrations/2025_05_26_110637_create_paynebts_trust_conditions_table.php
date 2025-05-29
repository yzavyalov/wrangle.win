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
        Schema::create('payments_trust_conditions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id')->constrained('payments');
            $table->integer('number_deposits')->nullable();
            $table->integer('value_deposits')->nullable();
            $table->integer('number_withdraw')->nullable();
            $table->integer('value_withdraw')->nullable();
            $table->integer('registration_days')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments_trust_conditions');
    }
};
