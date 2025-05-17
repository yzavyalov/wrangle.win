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
        Schema::table('payment_logs', function (Blueprint $table) {
            $table->dropColumn('sum');
            $table->dropColumn('currency');
            $table->dropColumn('status');
            $table->dropColumn('answer');
            $table->json('request')->nullable()->after('payment_logtable_id');
            $table->json('response')->nullable()->after('request');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_logs', function (Blueprint $table) {
            $table->dropColumn('request');
            $table->dropColumn('response');
            $table->decimal('sum',8,2)->after('payment_logtable_id');
            $table->string('currency')->after('sum');
            $table->integer('status')->after('currency');
            $table->text('answer')->after('status');
        });
    }
};
