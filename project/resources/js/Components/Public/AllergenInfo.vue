<template>
    <!-- ==========================================
         SECTION 6: ALLERGEN & DIETARY INFO
         ========================================== -->
    <section id="allergen-dietary" class="bg-warm-white py-12 md:py-16">
        <div class="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">

            <!-- Section Heading -->
            <div class="mb-12 max-w-3xl">
                <span class="text-xs font-bold uppercase tracking-widest text-truck-orange">
                    Transparency &amp; Care
                </span>
                <h2 class="mt-1.5 font-heading text-3xl font-bold text-charcoal-brown sm:text-4xl">
                    Allergen &amp; Dietary Information
                </h2>
                <p class="mt-2 text-base text-charcoal-brown/75">
                    We take kitchen integrity and guest safety seriously. Below is an honest breakdown of our
                    sourcing,
                    preparation methods, and allergen management.
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
                        100% Halal Sourcing Guarantee
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        All beef used in our sausages and chili con carne is procured from licensed Halal-certified
                        suppliers in
                        New Zealand and Hokkaido. Our kitchen operates under strict zero-pork, zero-lard, and
                        zero-alcohol
                        standards. We do not use cooking wine, sake, or mirin in any sauces or seasonings.
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        Halal certification documents are available at the truck counter upon request.
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
                        Gluten &amp; Wheat Buns
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        Our standard brioche buns are made from local Hokkaido wheat flour and contain gluten. For
                        guests
                        avoiding gluten, we gladly offer any chili dog served as a <strong>"Lettuce-Boat
                            Dog"</strong> wrapped
                        in fresh, crisp Hokkaido romaine leaves at no extra charge. Our chili sauce itself is
                        gluten-free.
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        Please notify the order window if you require lettuce-wrap preparation.
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
                        Dairy &amp; Cheese Allergens
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        Our cheddar melt dog features cheese made with pasteurized Hokkaido cow's milk. In addition,
                        our
                        standard buns are gently toasted with a touch of butter. If you have a dairy allergy or
                        lactose
                        intolerance, simply ask for <strong>"Dairy-Free Preparation"</strong>—we will toast your bun
                        dry or
                        provide a lettuce wrap with dairy-free chili.
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        Classic Chili Dog can easily be made 100% dairy-free.
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
                        Nut-Free &amp; Shellfish-Free Kitchen
                    </h3>
                    <p class="text-sm leading-relaxed text-charcoal-brown/80">
                        Our food truck operates an exclusively peanut-free and tree-nut-free prep area. We also do
                        not store,
                        prepare, or fry any shellfish or seafood in our truck, completely preventing
                        cross-contamination risks
                        for guests with seafood allergies.
                    </p>
                    <div class="flex items-center gap-2 pt-2 text-xs font-semibold text-charcoal-brown/70">
                        <span class="h-1.5 w-1.5 rounded-full bg-truck-orange"></span>
                        Frying oil for fries is 100% vegetable oil and never shared with animal proteins.
                    </div>
                </div>

            </div>

            <!-- Bottom Allergen Consultation Note -->
            <div
                class="mt-8 flex items-center gap-3 rounded-xl border border-toasted-tan/30 bg-warm-white p-4 text-xs text-charcoal-brown/75">
                <span class="text-base font-bold text-truck-orange">ℹ</span>
                <span>Have a specific dietary concern not listed above? Please speak directly with our head cook at
                    the
                    window or send an email prior to visiting.</span>
            </div>

        </div>
    </section>
</template>
