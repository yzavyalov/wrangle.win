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
        Schema::table('users', function (Blueprint $table) {
            $table->string('verification_status')->default('not_started');
            $table->boolean('is_verified')->default(false);

            $table->uuid('didit_session_id')->nullable()->index();
            $table->text('didit_verification_url')->nullable();
            $table->json('didit_decision')->nullable();

            $table->timestamp('verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('verification_status');
            $table->dropColumn('is_verified');
            $table->dropColumn('didit_session_id');
            $table->dropColumn('didit_verification_url');
            $table->dropColumn('didit_decision');
            $table->dropColumn('verified_at');
        });
    }
};
