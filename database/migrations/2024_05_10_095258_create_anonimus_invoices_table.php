<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('anonimus_invoices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('invoice_id');
            $table->string('user_email');
            $table->string('user_name');
            $table->string('currency');
            $table->string('expire');
            $table->string('price');
            $table->string('url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anonimus_invoices');
    }
};
