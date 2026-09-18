<script setup>
import { computed } from 'vue';
import { t, yen } from '@/i18n';

const props = defineProps({
    popularItem: {
        type: Object,
        default: null,
    },
    heroItem: {
        type: Object,
        default: null,
    },
    upcomingEvent: {
        type: Object,
        default: null,
    },
});

// Fallbacks when no matching record is found in the database.
const headlineText = computed(() => props.heroItem?.name ?? t('hero.fallbackTitle'));
const descriptionText = computed(() => props.heroItem?.description ?? t('hero.fallbackDesc'));

const heroBadge = computed(() => {
    const p = props.popularItem;
    if (!p) return '';
    if (p.badge_type === 'limited_batch') return t('badge.limitedBatch');
    if (p.badge_type === 'none') return '';

    return t('badge.muslimFriendlyCertified');
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
        <!-- Food Truck Backdrop -->
        <div class="absolute inset-0 z-0">
            <img id="hero-bg-image" :src="'/images/hero/hero-bg.jpg'" :alt="t('hero.truckAlt')"
                referrerpolicy="no-referrer" class="h-full w-full object-cover object-center scale-105 sm:scale-110" />
            <!--
                Warm scrim, weighted to the left where the copy sits, so the truck on the
                right stays clearly visible. Source image is only 1097×794, so keep the
                extra scale modest: cover already stretches it ~1.3x on a 1440px viewport,
                and going past ~1.15x total starts to soften the truck visibly.
            -->
            <!--
                Small screens: the copy spans the full width (4%–92%), so the wash has to
                be even. A left-weighted gradient leaves the right-hand text sitting on
                near-untinted photo.
            -->
            <div class="absolute inset-0 bg-charcoal-brown/72 lg:hidden"></div>
            <!-- lg+: weighted left, so the truck on the right stays clearly visible -->
            <div
                class="absolute inset-0 hidden bg-gradient-to-r from-charcoal-brown/92 from-20% via-charcoal-brown/45 via-45% to-charcoal-brown/5 lg:block">
            </div>
            <!-- Thin grounding wash so the copy keeps contrast over the sky and trees -->
            <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-brown/55 to-transparent">
            </div>
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

                    <!-- Dynamic Headline Overlay -->
                    <h1 id="hero-headline"
                        class="font-heading text-4xl font-bold leading-[1.12] tracking-tight text-warm-white sm:text-5xl lg:text-6xl">
                        {{ headlineText }}
                    </h1>

                    <!-- Dynamic Subheadline Overlay -->
                    <p id="hero-subheadline"
                        class="max-w-2xl text-lg font-normal leading-relaxed text-warm-white/85 sm:text-xl">
                        {{ descriptionText }}
                    </p>

                    <!-- Actions & CTAs Overlay -->
                    <div class="flex w-full flex-col items-stretch gap-4 pt-2 sm:w-auto sm:flex-row sm:items-center">
                        <a id="hero-primary-cta" href="#location-schedule"
                            class="inline-flex items-center justify-center rounded-xl bg-truck-orange px-7 py-3.5 text-center text-base font-semibold text-warm-white shadow-md transition-all duration-200 hover:bg-cheddar-yellow hover:text-charcoal-brown active:scale-98">
                            {{ t('hero.ctaPrimary') }}
                        </a>
                        <a id="hero-secondary-cta" href="#full-menu"
                            class="inline-flex items-center justify-center rounded-xl border border-warm-white/20 bg-warm-white/10 px-6 py-3.5 text-center text-base font-semibold text-warm-white backdrop-blur-sm transition-all duration-200 hover:bg-warm-white/20">
                            {{ t('hero.ctaSecondary') }}
                        </a>
                    </div>

                    <!-- Reassuring Brand Footnotes Overlay -->
                    <div class="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-warm-white/80">
                        <span class="flex items-center gap-1.5">
                            <span class="text-sm text-cheddar-yellow">★</span> {{ t('hero.fact1') }}
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="text-sm text-cheddar-yellow">★</span> {{ t('hero.fact2') }}
                        </span>
                        <span class="flex items-center gap-1.5">
                            <span class="text-sm text-cheddar-yellow">★</span> {{ t('hero.fact3') }}
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
                                {{ t('hero.mostPopular') }}
                            </div>
                            <!-- Price Pill in Yen -->
                            <div
                                class="absolute bottom-3 right-3 rounded-lg bg-charcoal-brown/90 px-3 py-1 text-sm font-bold text-warm-white shadow-xs backdrop-blur-xs">
                                {{ yen(popularItem.price_yen) }}
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
