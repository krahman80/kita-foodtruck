<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class MenuItem extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price_yen',
        'image_url',
        'image_alt_text',
        'spice_level',
        'category',
        'badge_type',
        'highlight_tag_1',
        'highlight_tag_2',
        'is_popular',
        'is_sold_out',
        'is_active',
        'display_order',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_popular' => 'boolean',
            'is_sold_out' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Scope to items that are publicly visible (DDD §4.2 invariant #4).
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * The single active popular item for the Hero, or null.
     */
    public static function popularItem(): ?self
    {
        return static::query()->active()->where('is_popular', true)->first();
    }

    /**
     * All publicly visible items ordered for the menu grid.
     *
     * @return \Illuminate\Database\Eloquent\Collection<int, static>
     */
    public static function publicMenu()
    {
        return static::query()->active()->orderBy('display_order')->get();
    }

    /**
     * Generate a unique slug from the name.
     */
    public static function makeSlug(string $name, ?int $ignoreId = null): string
    {
        $base = Str::slug($name);
        $slug = $base;
        $i = 2;

        while (static::query()->where('slug', $slug)->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = $base . '-' . $i;
            $i++;
        }

        return $slug;
    }
}
