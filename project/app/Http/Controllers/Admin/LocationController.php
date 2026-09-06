<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\LocationEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    /**
     * Show the location calendar + inline form.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Locations/Index', [
            'locations' => LocationEntry::orderBy('schedule_date')->get(),
        ]);
    }

    /**
     * Create a new scheduled stop.
     */
    public function store(LocationRequest $request): RedirectResponse
    {
        $entry = LocationEntry::create([
            ...$request->validated(),
            'status' => LocationEntry::STATUS_SCHEDULED,
        ]);

        return back()->with('flash', [
            'message' => "Stop saved for {$entry->schedule_date->format('M j, Y')}.",
            'type' => 'success',
        ]);
    }

    /**
     * Update an existing stop (editing a cancelled entry reactivates it).
     */
    public function update(LocationRequest $request, LocationEntry $locationEntry): RedirectResponse
    {
        $locationEntry->update([
            ...$request->validated(),
            'status' => LocationEntry::STATUS_SCHEDULED,
        ]);

        return back()->with('flash', [
            'message' => "Stop updated for {$locationEntry->schedule_date->format('M j, Y')}.",
            'type' => 'success',
        ]);
    }

    /**
     * Cancel a stop (keeps the record for history; never shown publicly).
     */
    public function cancel(LocationEntry $locationEntry): RedirectResponse
    {
        $locationEntry->update(['status' => LocationEntry::STATUS_CANCELLED]);

        return back()->with('flash', [
            'message' => "Stop cancelled for {$locationEntry->schedule_date->format('M j, Y')}.",
            'type' => 'warning',
        ]);
    }
}
