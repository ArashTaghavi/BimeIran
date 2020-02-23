<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMarketerCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marketer_customers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('marketer_id');
            $table->string('full_name');
            $table->string('national_code');
            $table->string('phone')->unique();
            $table->text('address');
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
        Schema::dropIfExists('marketer_customers');
    }
}
