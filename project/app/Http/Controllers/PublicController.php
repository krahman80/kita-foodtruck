<?php

namespace App\Http\Controllers;

use App\Models\LocationEntry;
use App\Models\MenuItem;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    /**
     * Render the public single-page site with today's/next stop, menu, and hero data.
     */
    public function home(): Response
    {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'todayLocation' => LocationEntry::todayScheduled(),
            'nextLocation' => LocationEntry::nextScheduled(),
            'menuItems' => MenuItem::publicMenu(),
            'popularItem' => MenuItem::popularItem(),
            // An active, non-popular menu item to drive the hero overlay text.
            'heroItem' => MenuItem::query()
                ->where('is_active', true)
                ->where('is_popular', false)
                ->inRandomOrder()
                ->first(),
            'upcomingEvent' => LocationEntry::query()
                ->where('is_event', true)
                ->whereDate('schedule_date', '>=', now()->toDateString())
                ->orderBy('schedule_date')
                ->first(),
        ]);
    }

    /**
     * Backwards-compatible redirect for anything still pointing at the old /dashboard.
     */
    public function dashboardRedirect(): RedirectResponse
    {
        return redirect()->route('admin.dashboard');
    }
}
