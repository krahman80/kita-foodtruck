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
                        <img id="owner-potrait-img" :src="'/images/about/owner-img.jpg'"
                            alt="Kenji and Tariq, co-founders and chefs of Kita Halal Chili Dogs inside their Sapporo food truck kitchen"
                            referrerpolicy="no-referrer"
                            class="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-102" />

                        <!-- Editorial Photo Caption Overlay -->
                        <div class="border-t border-toasted-tan/25 bg-warm-white p-4 text-left">
                            <p class="font-heading text-sm font-bold text-charcoal-brown">
                                Kenji Sato &amp; Tariq Al-Mansoor
                            </p>
                            <p class="mt-0.5 text-xs text-charcoal-brown/70">
                                Co-founders &amp; Head Cooks, Kita Halal Chili Dogs Sapporo
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
                            Our story began in the winter of 2022 during the Sapporo Snow Festival. Tariq, an
                            architecture
                            graduate student living in Hokkaido, and Kenji, a native Sapporo chef who trained in
                            rustic comfort
                            cooking, stood watching international travelers and Muslim residents search fruitlessly
                            for hearty,
                            warm street food that honored strict dietary principles.
                        </p>
                        <p>
                            "In a city famous across the world for rich ramen and winter markets, almost everything
                            contained pork
                            bones, lard, or mirin," recalls Tariq. "We wanted to create a welcoming curb where
                            anyone—Muslim
                            travelers, local families, and chili dog purists alike—could bite into something warm,
                            deeply
                            satisfying, and completely worry-free."
                        </p>
                        <p>
                            We restored a 1994 Japanese step van, painted it in warm retro orange with clean white
                            trim, and spent
                            eleven months perfecting our slow-simmered beef chili con carne. We source certified
                            halal beef
                            brisket, local Tokachi cheese, and pair them with custom-steamed milk buns baked each
                            morning by an
                            artisan bakery in central Sapporo.
                        </p>
                        <p class="font-medium text-charcoal-brown">
                            No shortcuts. No industrial fillers. Just patient craftsmanship and honest hospitality
                            on wheels.
                        </p>
                    </div>

                    <!-- Key Pillars Row -->
                    <div class="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
                        <div class="rounded-xl border border-toasted-tan/25 bg-tan-subtle p-4">
                            <span class="block font-heading text-2xl font-bold text-truck-orange">100%</span>
                            <span class="text-xs font-semibold text-charcoal-brown">Halal Sourced</span>
                            <p class="mt-1 text-[11px] text-charcoal-brown/70">Every cut of beef rigorously
                                certified.</p>
                        </div>
                        <div class="rounded-xl border border-toasted-tan/25 bg-tan-subtle p-4">
                            <span class="block font-heading text-2xl font-bold text-truck-orange">12 Hrs</span>
                            <span class="text-xs font-semibold text-charcoal-brown">Slow Simmer</span>
                            <p class="mt-1 text-[11px] text-charcoal-brown/70">Rich depth of cumin, garlic &amp;
                                chilies.</p>
                        </div>
                        <div class="rounded-xl border border-toasted-tan/25 bg-tan-subtle p-4">
                            <span class="block font-heading text-2xl font-bold text-truck-orange">Local</span>
                            <span class="text-xs font-semibold text-charcoal-brown">Hokkaido Buns</span>
                            <p class="mt-1 text-[11px] text-charcoal-brown/70">Baked fresh daily in Sapporo.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
