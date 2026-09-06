<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class LocationEntry extends Model
{
    /**
     * The table associated with the model (DDD aggregate name vs. ERD table name).
     */
    protected $table = 'locations';

    public const STATUS_SCHEDULED = 'scheduled';

    public const STATUS_CANCELLED = 'cancelled';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'schedule_date',
        'location_name',
        'address',
        'landmark_note',
        'start_time',
        'end_time',
        'latitude',
        'longitude',
        'map_pin_note',
        'transit_note',
        'is_event',
        'event_name',
        'status',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'schedule_date' => 'date:Y-m-d',
            'is_event' => 'boolean',
        ];
    }

    /**
     * Scope the query to the single scheduled entry for a given date.
     *
     * A cancelled entry is treated as a Rest Day (DDD §4.1 invariant #4).
     */
    public function scopeScheduledOn(Builder $query, Carbon|string $date): Builder
    {
        return $query
            ->whereDate('schedule_date', $date)
            ->where('status', self::STATUS_SCHEDULED);
    }

    /**
     * The single scheduled entry for today, or null if today is a Rest Day.
     */
    public static function todayScheduled(): ?self
    {
        return static::query()->scheduledOn(Carbon::today())->first();
    }
}
