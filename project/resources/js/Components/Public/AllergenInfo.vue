<script setup>
import { t } from '@/i18n';
</script>

<template>
    <!-- ==========================================
         SECTION 6: ALLERGEN & DIETARY INFO
         ========================================== -->
    <section id="allergen-dietary" class="bg-warm-white py-12 md:py-16">
        <div class="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">

            <!-- Section Heading -->
            <div class="mb-12 max-w-3xl">
                <span class="text-xs font-bold uppercase tracking-widest text-truck-orange">
                    {{ t('allergen.eyebrow') }}
                </span>
                <h2 class="mt-1.5 font-heading text-3xl font-bold text-charcoal-brown sm:text-4xl">
                    {{ t('allergen.title') }}
                </h2>
                <p class="mt-2 text-base text-charcoal-brown/75">
                    {{ t('allergen.intro') }}
                </p>
            </div>

            <!-- Clean Informational Cards -->
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">

                <!-- Card 1: Halal Sourcing Certification -->
                <div class="space-y-3 rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-6 sm:p-8">
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-xl border border-toasted-tan/30 bg-warm-white text-cheddar-yellow">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                        {{ t('allergen.card1Title') }}
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        {{ t('allergen.card1Body') }}
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        {{ t('allergen.card1Foot') }}
                    </div>
                </div>

                <!-- Card 2: Gluten & Wheat Details -->
                <div class="space-y-3 rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-6 sm:p-8">
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-xl border border-toasted-tan/30 bg-warm-white text-truck-orange">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <path d="M6 2v20M18 2v20M6 12h12" />
                        </svg>
                    </div>
                    <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                        {{ t('allergen.card2Title') }}
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        {{ t('allergen.card2Body') }}
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        {{ t('allergen.card2Foot') }}
                    </div>
                </div>

                <!-- Card 3: Dairy & Cheese Management -->
                <div class="space-y-3 rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-6 sm:p-8">
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-xl border border-toasted-tan/30 bg-warm-white text-cheddar-yellow">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 3v18" />
                            <path d="M3 12h18" />
                        </svg>
                    </div>
                    <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                        {{ t('allergen.card3Title') }}
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        {{ t('allergen.card3Body') }}
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        {{ t('allergen.card3Foot') }}
                    </div>
                </div>

                <!-- Card 4: Nuts & Shellfish Safety -->
                <div class="space-y-3 rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-6 sm:p-8">
                    <div
                        class="flex h-9 w-9 items-center justify-center rounded-xl border border-toasted-tan/30 bg-warm-white text-truck-orange">
                        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                    </div>
                    <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                        {{ t('allergen.card4Title') }}
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        {{ t('allergen.card4Body') }}
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        {{ t('allergen.card4Foot') }}
                    </div>
                </div>

            </div>

            <!-- Bottom Allergen Consultation Note -->
            <div
                class="mt-8 flex items-center gap-3 rounded-xl border border-toasted-tan/30 bg-warm-white p-4 text-xs text-charcoal-brown/75">
                <span class="text-base font-bold text-truck-orange">ℹ</span>
                <span>{{ t('allergen.contact') }}</span>
            </div>

        </div>
    </section>
</template>
