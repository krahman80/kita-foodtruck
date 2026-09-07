<?php

namespace App\Services;

use App\Models\MenuItem;
use Illuminate\Support\Facades\DB;

/**
 * Guarantees the "exactly one popular item at a time" rule, which spans
 * multiple MenuItem aggregates and therefore cannot live on a single model (DDD §4.2).
 */
class MenuFeaturingService
{
    /**
     * Clear is_popular from whichever item holds it, then feature the given item.
     */
    public function feature(MenuItem $menuItem): MenuItem
    {
        DB::transaction(function () use ($menuItem) {
            MenuItem::query()->where('is_popular', true)->update(['is_popular' => false]);
            $menuItem->update(['is_popular' => true]);
        });

        return $menuItem->fresh();
    }

    /**
     * Un-feature the given item (used when deactivating/removing a popular item).
     */
    public function unfeature(MenuItem $menuItem): MenuItem
    {
        $menuItem->update(['is_popular' => false]);

        return $menuItem->fresh();
    }
}
