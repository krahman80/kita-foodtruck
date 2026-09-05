<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
</script>

<template>

    <Head title="Dashboard" />

    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <!-- Locations (placeholder for Sprint 1) -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-6">
                            <h3 class="text-base font-semibold text-gray-800">Location Calendar</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                Manage today's stop and the truck's schedule.
                            </p>
                            <span
                                class="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                Coming in Sprint 1
                            </span>
                        </div>
                    </div>

                    <!-- Menu (placeholder for Sprint 2) -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-6">
                            <h3 class="text-base font-semibold text-gray-800">Menu Items</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                Manage menu items, prices, availability, and featured item.
                            </p>
                            <span
                                class="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                                Coming in Sprint 2
                            </span>
                        </div>
                    </div>

                    <!-- Accounts -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-6">
                            <h3 class="text-base font-semibold text-gray-800">Admin Accounts</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                Add or remove other admin accounts.
                            </p>
                            <Link :href="route('admin.accounts.index')"
                                class="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Manage accounts →
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Security reminder -->
                <div class="mt-6 overflow-hidden rounded-lg bg-white p-6 shadow">
                    <p class="text-sm text-gray-600">
                        Tip: if you are using the seeded default password, change it from your
                        <Link :href="route('profile.edit')" class="font-medium text-indigo-600 hover:text-indigo-500">
                            profile
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
