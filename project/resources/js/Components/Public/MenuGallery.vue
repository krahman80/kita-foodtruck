<script setup>
import MenuCard from '@/Components/Public/MenuCard.vue';

defineProps({
    items: { type: Array, required: true },
});
</script>

<template>
    <!-- SECTION 4: FULL MENU WITH PRICES (data-driven) -->
    <section id="full-menu" class="bg-warm-white py-12 md:py-16">
        <div class="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div class="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <span class="text-xs font-bold uppercase tracking-widest text-truck-orange">Handcrafted Daily</span>
                    <h2 class="mt-1.5 font-heading text-3xl font-bold text-charcoal-brown sm:text-4xl">
                        Full Menu &amp; Prices
                    </h2>
                    <p class="mt-2 max-w-2xl text-base text-charcoal-brown/75">
                        Every sausage is certified 100% halal beef, topped with slow-reduced chili con carne and paired
                        with toasted artisan milk buns. All prices in Japanese Yen (¥), tax inclusive.
                    </p>
                </div>
                <div
                    class="inline-flex items-center gap-2 self-start rounded-lg border border-toasted-tan/30 bg-tan-subtle px-3.5 py-1.5 text-xs font-medium text-charcoal-brown/80 md:self-auto">
                    <span class="h-2 w-2 rounded-full bg-cheddar-yellow"></span>
                    <span>100% Halal Certified Kitchen</span>
                </div>
            </div>

            <div v-if="items.length" class="grid grid-cols-1 gap-8 sm:gap-9 md:grid-cols-2 lg:grid-cols-3">
                <MenuCard v-for="item in items" :key="item.id" :item="item" />
            </div>

            <!-- Empty state -->
            <div v-else class="rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-12 text-center">
                <h3 class="font-heading text-2xl font-bold text-charcoal-brown">Menu coming soon</h3>
                <p class="mx-auto mt-2 max-w-xl text-base text-charcoal-brown/75">
                    We're still finalizing our menu. Check back shortly for full listings and prices.
                </p>
            </div>

            <!-- Combo notice -->
            <div
                class="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-5 sm:flex-row sm:p-6">
                <div class="text-center sm:text-left">
                    <span class="font-heading text-base font-bold text-charcoal-brown">Truck Combo Special:</span>
                    <span class="ml-2 text-sm text-charcoal-brown/80">Add Kutchan Russet Fries &amp; Craft Cola to any
                        dog
                        for just <strong class="font-bold text-truck-orange">+¥700</strong></span>
                </div>
                <a id="menu-find-truck-btn" href="#location-schedule"
                    class="inline-flex shrink-0 items-center justify-center rounded-xl bg-truck-orange px-5 py-2.5 text-xs font-semibold text-warm-white shadow-2xs transition-all hover:bg-cheddar-yellow hover:text-charcoal-brown">
                    Order at the Window
                </a>
            </div>
        </div>
    </section>
</template>
