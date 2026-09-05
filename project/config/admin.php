<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Admin Account
    |--------------------------------------------------------------------------
    |
    | The bootstrap admin account created by DatabaseSeeder. Because accounts
    | can only be created by an existing admin (there is no public sign-up),
    | this seeded account is the only way to obtain the first login.
    |
    | Override these via environment variables in production; never rely on
    | the committed defaults outside local development.
    |
    */

    'name' => env('ADMIN_NAME', 'Kita Admin'),

    'email' => env('ADMIN_EMAIL', 'admin@kitachilidogs.jp'),

    'password' => env('ADMIN_PASSWORD', 'password'),

];
