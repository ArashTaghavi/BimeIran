<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTrackingCodeToMarketerWithdraws extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('marketer_withdraws', function (Blueprint $table) {
            $table->string('tracking_code')->nullable()->after('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('marketer_withdraws', function (Blueprint $table) {
            $table->dropColumn('tracking_code');
        });
    }
}
