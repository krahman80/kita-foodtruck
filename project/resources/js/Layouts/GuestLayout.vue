<script setup>
import { t } from '@/i18n';
</script>

<template>
    <div class="flex min-h-screen flex-col items-center justify-center bg-cream px-4 py-12">
        <div class="w-full max-w-md">
            <!-- Brand -->
            <div class="mb-6 flex flex-col items-center text-center">

                <span
                    class="font-heading text-xl font-bold tracking-tight whitespace-nowrap text-charcoal-brown sm:text-2xl">キタハラルチリドッグス</span>
                <span class="text-[11px] font-semibold uppercase tracking-[0.18em] text-truck-orange">{{
                    t('auth.tagline') }}</span>
            </div>

            <!-- Card -->
            <div class="overflow-hidden rounded-2xl border border-black/5 bg-warm-white px-6 py-8 shadow-xl">
                <slot />
            </div>
        </div>
    </div>
</template>
