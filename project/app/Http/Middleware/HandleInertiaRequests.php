<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // Lazy on purpose. share() runs in the web middleware group, which is
            // BEFORE route middleware, so reading app()->getLocale() eagerly here
            // would report the pre-SetLocale value and the client would seed itself
            // in a different language than the server renders (validation messages,
            // mail, <html lang>). The closure defers the read to response time.
            'locale' => fn() => app()->getLocale(),
            'flash' => session('flash'),
        ];
    }
}
