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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            // Natural key: exactly one entry per calendar date.
            $table->date('schedule_date')->unique();
            $table->string('location_name');
            $table->string('address')->nullable();
            $table->string('landmark_note')->nullable();
            $table->time('start_time');
            $table->time('end_time');
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->string('map_pin_note')->nullable();
            $table->string('transit_note')->nullable();
            $table->boolean('is_event')->default(false);
            // Required when is_event is true (invariant enforced in validation/model).
            $table->string('event_name')->nullable();
            $table->enum('status', ['scheduled', 'cancelled'])->default('scheduled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
