<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTravelPlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('travel_plans', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('latin_name');
            $table->string('one_seven');
            $table->string('eight_fifteen');
            $table->string('sixteen_twentythree');
            $table->string('twentyfour_thirtyone');
            $table->string('thirtytwo_fortyfive');
            $table->string('fortysix_sixtytwo');
            $table->string('sixtythree_nintytwo');
            $table->string('six_month');
            $table->string('one_year');
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
        Schema::dropIfExists('travel_plans');
    }
}
