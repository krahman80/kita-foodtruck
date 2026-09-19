<script setup>
import { t } from '@/i18n';
</script>

<template>
    <!-- ==========================================
         SECTION 5: ABOUT / STORY
         ========================================== -->
    <section id="our-story" class="bg-warm-white py-12 md:py-16">
        <div class="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">

                <!-- Owner Photo Column (5 cols) -->
                <div class="order-2 lg:order-1 lg:col-span-5">
                    <div id="owner-photo-container"
                        class="group relative overflow-hidden rounded-2xl border border-toasted-tan/35 bg-tan-subtle shadow-sm">
                        <img id="owner-potrait-img" :src="'/images/about/owner-img.jpg'" :alt="t('about.photoAlt')"
                            referrerpolicy="no-referrer"
                            class="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-102" />

                        <!-- Editorial Photo Caption Overlay -->
                        <div class="border-t border-toasted-tan/25 bg-warm-white p-4 text-left">
                            <p class="font-heading text-sm font-bold text-charcoal-brown">
                                {{ t('about.captionName') }}
                            </p>
                            <p class="mt-0.5 text-xs text-charcoal-brown/70">
                                {{ t('about.captionRole') }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Story Narrative Column (7 cols) -->
                <div class="order-1 space-y-6 lg:order-2 lg:col-span-7">
                    <div>
                        <span class="text-xs font-bold uppercase tracking-widest text-truck-orange">
                            {{ t('about.eyebrow') }}
                        </span>
                        <h2
                            class="mt-1.5 font-heading text-3xl font-bold leading-tight text-charcoal-brown sm:text-4xl">
                            {{ t('about.title') }}
                        </h2>
                    </div>

                    <div class="space-y-4 text-base leading-relaxed text-charcoal-brown/85">
                        <p>
                            {{ t('about.body1') }}
                        </p>
                        <p>
                            {{ t('about.body2') }}
                        </p>
                        <p>
                            {{ t('about.body3') }}
                        </p>
                        <p class="font-medium text-charcoal-brown">
                            {{ t('about.body4') }}
                        </p>
                    </div>

                    <!-- Key Pillars Row -->
                    <div class="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
                        <div class="rounded-xl border border-toasted-tan/25 bg-tan-subtle p-4">
                            <span class="block font-heading text-2xl font-bold text-truck-orange">{{
                                t('about.pillar1Value') }}</span>
                            <span class="text-xs font-semibold text-charcoal-brown">{{ t('about.pillar1Label') }}</span>
                            <p class="mt-1 text-[11px] text-charcoal-brown/70">{{ t('about.pillar1Desc') }}</p>
                        </div>
                        <div class="rounded-xl border border-toasted-tan/25 bg-tan-subtle p-4">
                            <span class="block font-heading text-2xl font-bold text-truck-orange">{{
                                t('about.pillar2Value') }}</span>
                            <span class="text-xs font-semibold text-charcoal-brown">{{ t('about.pillar2Label') }}</span>
                            <p class="mt-1 text-[11px] text-charcoal-brown/70">{{ t('about.pillar2Desc') }}</p>
                        </div>
                        <div class="rounded-xl border border-toasted-tan/25 bg-tan-subtle p-4">
                            <span class="block font-heading text-2xl font-bold text-truck-orange">{{
                                t('about.pillar3Value') }}</span>
                            <span class="text-xs font-semibold text-charcoal-brown">{{ t('about.pillar3Label') }}</span>
                            <p class="mt-1 text-[11px] text-charcoal-brown/70">{{ t('about.pillar3Desc') }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
