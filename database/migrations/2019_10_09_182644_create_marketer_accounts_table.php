<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMarketerAccountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marketer_accounts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('marketer_id');
            $table->string('card_number')->nullable();
            $table->string('shaba_number')->nullable();
            $table->string('account_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('marketer_accounts');
    }
}
