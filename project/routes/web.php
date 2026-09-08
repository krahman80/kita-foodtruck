<?php

use App\Http\Controllers\Admin\AccountController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LocationController;
use App\Http\Controllers\Admin\MenuItemController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, 'home']);

// Backwards-compatible redirect for anything still pointing at the old /dashboard.
Route::get('/dashboard', [PublicController::class, 'dashboardRedirect'])
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
