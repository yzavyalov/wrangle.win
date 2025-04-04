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
        Schema::table('bets', function (Blueprint $table) {
            $table->dropColumn('source');
            $table->string('source1')->after('status')->nullable();
            $table->string('source2')->after('source')->nullable();
            $table->string('source3')->after('source2')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bets', function (Blueprint $table) {
            $table->dropColumn('source1');
            $table->dropColumn('source2');
            $table->dropColumn('source3');
            $table->string('source')->after('status');
        });
    }
};
