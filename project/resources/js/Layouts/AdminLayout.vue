<script setup>
import { ref } from 'vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';
import { i18n, t, toggleLocale } from '@/i18n';

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen bg-cream">
            <nav class="border-b border-gray-100 bg-white">
                <!-- Primary Navigation Menu -->
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex shrink-0 items-center">
                                <Link :href="route('admin.dashboard')" class="flex items-center gap-2.5">
                                    <span
                                        class="flex h-9 w-9 items-center justify-center rounded-lg bg-truck-orange text-warm-white shadow-sm">
                                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                            aria-hidden="true">
                                            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                                            <path d="M15 18H9" />
                                            <path
                                                d="M19 18h2a1 1 0 0 0 1-1v-5.2a2 2 0 0 0-.586-1.414l-2.8-2.8A2 2 0 0 0 17.2 7H14v11h1" />
                                            <circle cx="7" cy="18" r="2" />
                                            <circle cx="17" cy="18" r="2" />
                                        </svg>
                                    </span>
                                    <span class="flex flex-col leading-tight">
                                        <span class="font-heading text-sm font-bold tracking-tight text-charcoal-brown">
                                            KITA CHILI DOGS
                                        </span>
                                        <span
                                            class="text-[10px] font-semibold uppercase tracking-wider text-truck-orange">
                                            Admin • Sapporo
                                        </span>
                                    </span>
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink :href="route('admin.dashboard')" :active="route().current('admin.dashboard')">
                                    {{ t('admin.nav.dashboard') }}
                                </NavLink>
                                <NavLink :href="route('admin.locations.index')"
                                    :active="route().current('admin.locations.*')">
                                    {{ t('admin.nav.locations') }}
                                </NavLink>
                                <NavLink :href="route('admin.menu.index')" :active="route().current('admin.menu.*')">
                                    {{ t('admin.nav.menu') }}
                                </NavLink>
                                <NavLink :href="route('admin.accounts.index')"
                                    :active="route().current('admin.accounts.*')">
                                    {{ t('admin.nav.accounts') }}
                                </NavLink>
                            </div>
                        </div>

                        <div class="hidden sm:ms-6 sm:flex sm:items-center">
                            <!-- Language toggle -->
                            <button id="admin-lang-toggle" type="button" @click="toggleLocale"
                                class="me-3 inline-flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:border-truck-orange hover:text-truck-orange"
                                :aria-label="'Switch language to ' + (i18n.locale === 'ja' ? 'English' : 'Japanese')">
                                {{ t('toggle.lang') }}
                            </button>

                            <!-- Settings Dropdown -->
                            <div class="relative ms-3">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button type="button"
                                                class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none">
                                                {{ $page.props.auth.user.name }}

                                                <svg class="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <DropdownLink :href="route('profile.edit')">
                                            {{ t('admin.profile') }}
                                        </DropdownLink>
                                        <DropdownLink :href="route('logout')" method="post" as="button">
                                            {{ t('admin.logout') }}
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <button @click="showingNavigationDropdown = !showingNavigationDropdown"
                                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        :class="{ hidden: showingNavigationDropdown, 'inline-flex': !showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16" />
                                    <path
                                        :class="{ hidden: !showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                    class="sm:hidden">
                    <div class="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink :href="route('admin.dashboard')"
                            :active="route().current('admin.dashboard')">
                            {{ t('admin.nav.dashboard') }}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('admin.locations.index')"
                            :active="route().current('admin.locations.*')">
                            {{ t('admin.nav.locations') }}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('admin.menu.index')" :active="route().current('admin.menu.*')">
                            {{ t('admin.nav.menu') }}
                        </ResponsiveNavLink>
                        <ResponsiveNavLink :href="route('admin.accounts.index')"
                            :active="route().current('admin.accounts.*')">
                            {{ t('admin.nav.accounts') }}
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Language Toggle -->
                    <div class="border-t border-gray-200 px-4 py-3">
                        <button id="admin-lang-toggle-mobile" type="button" @click="toggleLocale"
                            class="inline-flex w-full items-center justify-center rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:border-truck-orange hover:text-truck-orange">
                            {{ t('toggle.lang') }}
                        </button>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="border-t border-gray-200 pb-1 pt-4">
                        <div class="px-4">
                            <div class="text-base font-medium text-gray-800">{{ $page.props.auth.user.name }}</div>
                            <div class="text-sm font-medium text-gray-500">{{ $page.props.auth.user.email }}</div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile.edit')"> {{ t('admin.profile') }}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                {{ t('admin.logout') }}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header v-if="$slots.header" class="bg-white shadow">
                <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
