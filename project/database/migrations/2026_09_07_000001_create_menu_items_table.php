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
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->unsignedInteger('price_yen'); // whole yen, positive (DDD §4.2)
            $table->string('image_url');
            $table->string('image_alt_text');
            $table->enum('spice_level', ['mild', 'medium', 'hot', 'tangy']);
            $table->enum('category', ['chili_dog', 'drink']); // two v1 categories (PRD §11)
            $table->enum('badge_type', ['halal_standard', 'limited_batch', 'none'])->default('halal_standard');
            $table->string('highlight_tag_1')->nullable();
            $table->string('highlight_tag_2')->nullable();
            $table->boolean('is_popular')->default(false); // uniqueness via MenuFeaturingService
            $table->boolean('is_sold_out')->default(false);
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('display_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_items');
    }
};
