<?php

namespace Tests\Feature;

use App\Models\LocationEntry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class LocationEntryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    private function entryData(array $overrides = []): array
    {
        return array_merge([
            'schedule_date' => Carbon::today()->toDateString(),
            'location_name' => 'Odori Park',
            'address' => 'Odori Nishi 6-Chome, Chuo Ward',
            'start_time' => '11:00',
            'end_time' => '15:00',
            'latitude' => 43.0618,
            'longitude' => 141.3545,
            'is_event' => false,
        ], $overrides);
    }

    private function createEntry(array $overrides = []): LocationEntry
    {
        $data = $this->entryData($overrides);
        $data['status'] = $data['status'] ?? LocationEntry::STATUS_SCHEDULED;

        return LocationEntry::create($data);
    }

    public function test_today_scheduled_returns_the_scheduled_entry_for_today(): void
    {
        $this->createEntry();

        $this->assertNotNull(LocationEntry::todayScheduled());
        $this->assertSame(Carbon::today()->toDateString(), LocationEntry::todayScheduled()->schedule_date->toDateString());
    }

    public function test_cancelled_entry_is_treated_as_a_rest_day(): void
    {
        $this->createEntry(['status' => LocationEntry::STATUS_CANCELLED]);

        $this->assertNull(LocationEntry::todayScheduled());
    }

    public function test_next_scheduled_returns_the_nearest_future_scheduled_entry(): void
    {
        $tomorrow = Carbon::tomorrow()->toDateString();
        $this->createEntry(['schedule_date' => $tomorrow, 'location_name' => 'Sapporo Station']);

        $this->assertSame($tomorrow, LocationEntry::nextScheduled()->schedule_date->toDateString());
    }

    public function test_a_cancelled_entry_is_not_picked_as_next_service(): void
    {
        $this->createEntry([
            'schedule_date' => Carbon::tomorrow()->toDateString(),
            'status' => LocationEntry::STATUS_CANCELLED,
        ]);

        $this->assertNull(LocationEntry::nextScheduled());
    }

    public function test_cannot_create_two_stops_for_the_same_date(): void
    {
        $this->createEntry();

        $this->post('/admin/locations', $this->entryData())
            ->assertSessionHasErrors('schedule_date');
    }

    public function test_end_time_must_be_after_start_time(): void
    {
        $this->post('/admin/locations', $this->entryData([
            'schedule_date' => Carbon::tomorrow()->toDateString(),
            'start_time' => '15:00',
            'end_time' => '11:00',
        ]))->assertSessionHasErrors('end_time');
    }

    public function test_event_requires_an_event_name(): void
    {
        $this->post('/admin/locations', $this->entryData([
            'schedule_date' => Carbon::tomorrow()->toDateString(),
            'is_event' => true,
        ]))->assertSessionHasErrors('event_name');
    }

    public function test_owner_can_store_a_valid_stop(): void
    {
        $this->post('/admin/locations', $this->entryData([
            'schedule_date' => Carbon::tomorrow()->toDateString(),
        ]))->assertSessionHasNoErrors();

        $this->assertDatabaseHas('locations', ['schedule_date' => Carbon::tomorrow()->toDateString()]);
    }
}
