<?php

namespace App\Http\Controllers;

use App\Http\Middleware\SetLocale;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\Rule;

class LocaleController extends Controller
{
    /**
     * Persist the visitor's language choice.
     *
     * Called fire-and-forget from the client-side language toggle. The response
     * is deliberately 204 rather than a redirect: the toggle already re-renders
     * reactively, so there is nothing for the browser to navigate to, and a
     * redirect would make the client fetch a full HTML page for nothing.
     *
     * The cookie cannot be written from JavaScript — EncryptCookies discards
     * plain values it cannot decrypt — so it has to be set here.
     */
    public function __invoke(Request $request): Response
    {
        $validated = $request->validate([
            'locale' => ['required', 'string', Rule::in(SetLocale::SUPPORTED)],
        ]);

        $request->session()->put(SetLocale::SESSION_KEY, $validated['locale']);

        Cookie::queue(Cookie::forever(SetLocale::COOKIE_KEY, $validated['locale']));

        return response()->noContent();
    }
}
