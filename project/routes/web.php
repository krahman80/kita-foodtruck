<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\ProfileController;
use App\Models\LocationEntry;
use App\Models\MenuItem;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'todayLocation' => LocationEntry::todayScheduled(),
        'nextLocation' => LocationEntry::nextScheduled(),
        'menuItems' => MenuItem::publicMenu(),
        'popularItem' => MenuItem::popularItem(),
        // Query an active, non-popular menu item for the hero overlay text
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
});

// Backwards-compatible redirect for anything still pointing at the old /dashboard.
Route::get('/dashboard', fn() => redirect()->route('admin.dashboard'))
    ->middleware(['auth', 'verified'])->name('dashboard');

// Protected admin area (owner-only).
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('accounts', [AccountController::class, 'index'])->name('accounts.index');
    Route::post('accounts', [AccountController::class, 'store'])->name('accounts.store');
    Route::delete('accounts/{user}', [AccountController::class, 'destroy'])->name('accounts.destroy');

    Route::get('locations', [LocationController::class, 'index'])->name('locations.index');
    Route::post('locations', [LocationController::class, 'store'])->name('locations.store');
    Route::patch('locations/{locationEntry}', [LocationController::class, 'update'])->name('locations.update');
    Route::post('locations/{locationEntry}/cancel', [LocationController::class, 'cancel'])->name('locations.cancel');

    Route::get('menu', [MenuItemController::class, 'index'])->name('menu.index');
    Route::post('menu', [MenuItemController::class, 'store'])->name('menu.store');
    Route::patch('menu/{menuItem}', [MenuItemController::class, 'update'])->name('menu.update');
    Route::post('menu/{menuItem}/feature', [MenuItemController::class, 'feature'])->name('menu.feature');
    Route::post('menu/{menuItem}/toggle-sold-out', [MenuItemController::class, 'toggleSoldOut'])->name('menu.toggle-sold-out');
    Route::post('menu/{menuItem}/toggle-active', [MenuItemController::class, 'toggleActive'])->name('menu.toggle-active');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
