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
        Schema::table('bits', function (Blueprint $table) {
            $table->foreignId('bet_id')->constrained('bets');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bits', function (Blueprint $table) {
            $table->dropForeign(['bet_id']); // Исправлено
            $table->dropColumn('bet_id');
        });
    }
};
