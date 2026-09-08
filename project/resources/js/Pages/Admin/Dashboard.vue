<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { t } from '@/i18n';
</script>

<template>

    <Head title="Dashboard" />

    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">{{ t('admin.page.dashboard') }}</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <!-- Locations -->
                    <Link :href="route('admin.locations.index')"
                        class="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
                        <div class="p-6">
                            <h3 class="text-base font-semibold text-gray-800">{{ t('admin.dash.locTitle') }}</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                {{ t('admin.dash.locDesc') }}
                            </p>
                            <span
                                class="mt-3 inline-block text-sm font-medium text-truck-orange hover:text-orange-soft">
                                {{ t('admin.manage.locations') }}
                            </span>
                        </div>
                    </Link>

                    <!-- Menu -->
                    <Link :href="route('admin.menu.index')"
                        class="block overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md">
                        <div class="p-6">
                            <h3 class="text-base font-semibold text-gray-800">{{ t('admin.dash.menuTitle') }}</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                {{ t('admin.dash.menuDesc') }}
                            </p>
                            <span
                                class="mt-3 inline-block text-sm font-medium text-truck-orange hover:text-orange-soft">
                                {{ t('admin.manage.menu') }}
                            </span>
                        </div>
                    </Link>

                    <!-- Accounts -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-6">
                            <h3 class="text-base font-semibold text-gray-800">{{ t('admin.dash.accTitle') }}</h3>
                            <p class="mt-1 text-sm text-gray-600">
                                {{ t('admin.dash.accDesc') }}
                            </p>
                            <Link :href="route('admin.accounts.index')"
                                class="mt-3 inline-block text-sm font-medium text-truck-orange hover:text-orange-soft">
                                {{ t('admin.manage.accounts') }}
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Security reminder -->
                <div class="mt-6 overflow-hidden rounded-lg bg-white p-6 shadow">
                    <p class="text-sm text-gray-600">
                        {{ t('admin.dash.tip') }}
                        <Link :href="route('profile.edit')"
                            class="font-medium text-truck-orange hover:text-orange-soft">
                            {{ t('admin.dash.profile') }}
                        </Link>.
                    </p>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
