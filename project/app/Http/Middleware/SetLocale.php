<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

/**
 * Applies the visitor's chosen locale.
 *
 * Resolution order: session → cookie → application default. Only values in
 * {@see SetLocale::SUPPORTED} are ever applied, so a tampered session or cookie
 * can never select an arbitrary locale.
 *
 * Applied to the public route only. Staff routes use {@see ForceLocale} instead,
 * because the admin and auth screens are Japanese-only.
 */
class SetLocale
{
    /**
     * Locales the application is allowed to render.
     *
     * @var list<string>
     */
    public const SUPPORTED = ['ja', 'en'];

    public const SESSION_KEY = 'locale';

    public const COOKIE_KEY = 'kita_locale';

    public function handle(Request $request, Closure $next): Response
    {
        App::setLocale($this->resolve($request));

        return $next($request);
    }

    /**
     * Resolve the first supported locale from the session, then the cookie,
     * then the application default.
     */
    private function resolve(Request $request): string
    {
        $candidates = [
            $request->session()->get(self::SESSION_KEY),
            $request->cookie(self::COOKIE_KEY),
        ];

        foreach ($candidates as $candidate) {
            if (is_string($candidate) && in_array($candidate, self::SUPPORTED, true)) {
                return $candidate;
            }
        }

        return config('app.locale');
    }
}
