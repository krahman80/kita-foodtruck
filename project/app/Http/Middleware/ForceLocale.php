<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

/**
 * Pins a route group to a fixed locale.
 *
 * The admin, auth and profile screens are Japanese-only, so they must never
 * follow the public language toggle. Without this guard a staff member who had
 * toggled English on the public site would be served English validation
 * messages in the admin if {@see SetLocale} were ever applied application-wide.
 *
 * Usage: ->middleware('force-locale') or ->middleware('force-locale:en').
 */
class ForceLocale
{
    public function handle(Request $request, Closure $next, string $locale = 'ja'): Response
    {
        App::setLocale($locale);

        return $next($request);
    }
}
