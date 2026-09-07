<script setup>
import { computed } from 'vue';

const props = defineProps({
    popularItem: {
        type: Object,
        default: null,
    },
    upcomingEvent: {
        type: Object,
        default: null,
    },
});

const money = (n) => `¥${Number(n).toLocaleString('en-US')}`;

const heroBadge = computed(() => {
    const p = props.popularItem;
    if (!p) return '';
    if (p.badge_type === 'limited_batch') return 'Limited Batch';
    if (p.badge_type === 'none') return '';
    return 'Halal Certified';
});
</script>

<template>
    <!-- ==========================================
         SECTION 2: HERO
         Displays popular item (image/name/price),
         upcoming event, headline, subheadline, CTAs.
         ========================================== -->
    <section id="main-hero"
        class="relative flex min-h-[580px] items-center overflow-hidden sm:min-h-[640px] lg:min-h-[680px]">
        <!-- Full Background Image with Calm Editorial Warmth Scrim -->
        <div class="absolute inset-0 z-0">
            <img id="hero-bg-image" :src="'/images/hero/hero-bg.jpg'"
                alt="Artisan halal chili dogs slow-simmered and served on toasted Hokkaido milk bread buns"
                referrerpolicy="no-referrer" class="h-full w-full object-cover object-center" />
            <!-- Multi-stop warm editorial scrim overlay for high legibility and boutique warmth -->
            <div
                class="absolute inset-0 bg-gradient-to-r from-charcoal-brown/95 via-charcoal-brown/85 to-charcoal-brown/55">
            </div>
            <div class="absolute inset-0 bg-charcoal-brown/25"></div>
        </div>

        <!-- Content Overlay on Top of the Images -->
        <div class="relative z-10 mx-auto w-full max-w-[1140px] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div class="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

                <!-- Left Text Content Overlay (7 cols) -->
                <div class="flex flex-col items-start space-y-6 lg:col-span-7">

                    <!-- Upcoming Event Pill Overlay (data-driven) -->
                    <div v-if="upcomingEvent" id="hero-event-pill"
                        class="inline-flex items-center gap-2.5 rounded-full border border-toasted-tan/30 bg-warm-white/10 px-3.5 py-1.5 text-xs font-semibold text-warm-white shadow-sm backdrop-blur-md">
                        <span class="h-2 w-2 animate-pulse rounded-full bg-truck-orange"></span>
                        <span>{{ upcomingEvent.event_name }} — {{ upcomingEvent.location_name }}</span>
                    </div>

                    <!-- Headline Overlay -->
                    <h1 id="hero-headline"
                        class="font-heading text-4xl font-bold leading-[1.12] tracking-tight text-warm-white sm:text-5xl lg:text-6xl">
                        Slow-Simmered Halal Chili &amp; Hokkaido Brioche
                    </h1>

                    <!-- Subheadline Overlay -->
                    <p id="hero-subheadline"
                        class="max-w-2xl text-lg font-normal leading-relaxed text-warm-white/85 sm:text-xl">
                        Steamed-to-order halal beef franks topped with 12-hour spiced chili con carne,
                        freshly grated Hokkaido cheddar, and locally baked toasted milk buns.
                        Crafted with calm precision on the streets of Sapporo.
                    </p>

                    <!-- Actions & CTAs Overlay -->
                    <div class="flex w-full flex-col items-stretch gap-4 pt-2 sm:w-auto sm:flex-row sm:items-center">
                        <a id="hero-primary-cta" href="#location-schedule"
                            class="inline-flex items-center justify-center rounded-xl bg-truck-orange px-7 py-3.5 text-center text-base font-semibold text-warm-white shadow-md transition-all duration-200 hover:bg-cheddar-yellow hover:text-charcoal-brown active:scale-98">
                            See Today's Location
                        </a>
                        <a id="hero-secondary-cta" href="#full-menu"
                            class="inline-flex items-center justify-center rounded-xl border border-warm-white/20 bg-warm-white/10 px-6 py-3.5 text-center text-base font-semibold text-warm-white backdrop-blur-sm transition-all duration-200 hover:bg-warm-white/20">
                            Explore Menu (¥)
                        </a>
                    </div>

                    <!-- Reassuring Brand Footnotes Overlay -->
                    <div class="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-warm-white/80">
                        <span class="flex items-center gap-1.5">
                            <span class="text-sm text-cheddar-yellow">★</span> 100% Halal Certified Beef
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="text-sm text-cheddar-yellow">★</span> Zero Pork &amp; Zero Alcohol
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="text-sm text-cheddar-yellow">★</span> Fresh Buns Baked Daily
                        </span>
                    </div>
                </div>

                <!-- Right: Featured Popular Menu Item Showcase Card (5 cols) Overlaid on Hero -->
                <div v-if="popularItem" class="lg:col-span-5">
                    <div id="hero-popular-card"
                        class="rounded-2xl border border-toasted-tan/40 bg-warm-white/95 p-4 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-truck-orange/50 sm:p-5">
                        <div class="relative aspect-[4/3] overflow-hidden rounded-xl bg-tan-subtle">
                            <img id="hero-popular-img" :src="popularItem.image_url" :alt="popularItem.image_alt_text"
                                referrerpolicy="no-referrer"
                                class="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
                            <!-- Popular Tag -->
                            <div
                                class="absolute left-3 top-3 rounded-full bg-truck-orange px-3 py-1 text-xs font-bold tracking-wide text-warm-white shadow-xs">
                                Most Popular
                            </div>
                            <!-- Price Pill in Yen -->
                            <div
                                class="absolute bottom-3 right-3 rounded-lg bg-charcoal-brown/90 px-3 py-1 text-sm font-bold text-warm-white shadow-xs backdrop-blur-xs">
                                {{ money(popularItem.price_yen) }}
                            </div>
                        </div>

                        <!-- Item Description Info -->
                        <div class="pt-4 pb-1">
                            <div class="flex items-baseline justify-between">
                                <h2 class="font-heading text-xl font-bold text-charcoal-brown">
                                    {{ popularItem.name }}
                                </h2>
                                <span v-if="heroBadge"
                                    class="text-xs font-semibold uppercase tracking-wider text-cheddar-yellow">
                                    {{ heroBadge }}
                                </span>
                            </div>
                            <p class="mt-1.5 text-sm leading-relaxed text-charcoal-brown/75">
                                {{ popularItem.description }}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
