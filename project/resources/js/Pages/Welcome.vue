<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import LocationSchedule from '@/Components/Public/LocationSchedule.vue';

defineProps({
    todayLocation: {
        type: Object,
        default: null,
    },
    nextLocation: {
        type: Object,
        default: null,
    },
});
</script>

<template>
    <PublicLayout title="Welcome | Halal Chili Dog Sapporo">
        <!-- ==========================================
           SECTION 2: HERO
           Full image background with text overlay on top.
           Displays popular item (image/name/price),
           upcoming event, headline, subheadline,
           and primary CTA button in Truck Orange.
           ========================================== -->
        <section id="main-hero"
            class="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center overflow-hidden">
            <!-- Full Background Image with Calm Editorial Warmth Scrim -->
            <div class="absolute inset-0 z-0">
                <img id="hero-bg-image"
                    src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=2000&q=85"
                    alt="Artisan halal chili dogs slow-simmered and served on toasted Hokkaido milk bread buns"
                    referrerpolicy="no-referrer" class="w-full h-full object-cover object-center" />
                <!-- Multi-stop warm editorial scrim overlay for high legibility and boutique warmth -->
                <div
                    class="absolute inset-0 bg-gradient-to-r from-charcoal-brown/95 via-charcoal-brown/85 to-charcoal-brown/55">
                </div>
                <div class="absolute inset-0 bg-charcoal-brown/25"></div>
            </div>

            <!-- Content Overlay on Top of the Images -->
            <div class="relative z-10 w-full max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

                    <!-- Left Text Content Overlay (7 cols) -->
                    <div class="lg:col-span-7 flex flex-col items-start space-y-6">

                        <!-- Upcoming Event Pill Overlay -->
                        <div id="hero-event-pill"
                            class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-toasted-tan/30 bg-warm-white/10 backdrop-blur-md text-xs font-semibold text-warm-white shadow-sm">
                            <span class="w-2 h-2 rounded-full bg-truck-orange animate-pulse"></span>
                            <span>This weekend: Sapporo Autumn Food Festival — Odori Park Block 7</span>
                        </div>

                        <!-- Headline Overlay -->
                        <h1 id="hero-headline"
                            class="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-warm-white leading-[1.12]">
                            Slow-Simmered Halal Chili &amp; Hokkaido Brioche
                        </h1>

                        <!-- Subheadline Overlay -->
                        <p id="hero-subheadline"
                            class="text-lg sm:text-xl text-warm-white/85 font-normal leading-relaxed max-w-2xl">
                            Steamed-to-order halal beef franks topped with 12-hour spiced chili con carne,
                            freshly grated Hokkaido cheddar, and locally baked toasted milk buns.
                            Crafted with calm precision on the streets of Sapporo.
                        </p>

                        <!-- Actions & CTAs Overlay -->
                        <div
                            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
                            <a id="hero-primary-cta" href="#location-schedule"
                                class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-semibold text-warm-white bg-truck-orange hover:bg-cheddar-yellow hover:text-charcoal-brown transition-all duration-200 shadow-md active:scale-98 text-center">
                                See Today's Location
                            </a>
                            <a id="hero-secondary-cta" href="#full-menu"
                                class="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold text-warm-white bg-warm-white/10 hover:bg-warm-white/20 border border-warm-white/20 backdrop-blur-sm transition-all duration-200 text-center">
                                Explore Menu (¥)
                            </a>
                        </div>

                        <!-- Reassuring Brand Footnotes Overlay -->
                        <div class="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-warm-white/80">
                            <span class="flex items-center gap-1.5">
                                <span class="text-cheddar-yellow text-sm">★</span> 100% Halal Certified Beef
                            </span>
                            <span class="flex items-center gap-1.5">
                                <span class="text-cheddar-yellow text-sm">★</span> Zero Pork &amp; Zero Alcohol
                            </span>
                            <span class="flex items-center gap-1.5">
                                <span class="text-cheddar-yellow text-sm">★</span> Fresh Buns Baked Daily
                            </span>
                        </div>
                    </div>

                    <!-- Right: Featured Popular Menu Item Showcase Card (5 cols) Overlaid on Hero -->
                    <div class="lg:col-span-5">
                        <div id="hero-popular-card"
                            class="bg-warm-white/95 backdrop-blur-md rounded-2xl border border-toasted-tan/40 p-4 sm:p-5 shadow-lg transition-all duration-300 hover:border-truck-orange/50">
                            <div class="relative overflow-hidden rounded-xl aspect-[4/3] bg-tan-subtle">
                                <img id="hero-popular-img"
                                    src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1000&q=80"
                                    alt="The Signature Sapporo Halal Chili Dog served hot on toasted Hokkaido milk bread bun"
                                    referrerpolicy="no-referrer"
                                    class="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105" />
                                <!-- Popular Tag -->
                                <div
                                    class="absolute top-3 left-3 bg-truck-orange text-warm-white text-xs font-bold px-3 py-1 rounded-full shadow-xs tracking-wide">
                                    Most Popular
                                </div>
                                <!-- Price Pill in Yen -->
                                <div
                                    class="absolute bottom-3 right-3 bg-charcoal-brown/90 backdrop-blur-xs text-warm-white text-sm font-bold px-3 py-1 rounded-lg">
                                    ¥950
                                </div>
                            </div>

                            <!-- Item Description Info -->
                            <div class="pt-4 pb-1">
                                <div class="flex items-baseline justify-between">
                                    <h2 class="font-heading text-xl font-bold text-charcoal-brown">
                                        The Sapporo Classic Chili Dog
                                    </h2>
                                    <span class="text-xs font-semibold text-cheddar-yellow uppercase tracking-wider">
                                        Halal Certified
                                    </span>
                                </div>
                                <p class="mt-1.5 text-sm text-charcoal-brown/75 leading-relaxed">
                                    Custom-spiced halal beef sausage, 12-hour simmered Texas-Hokkaido beef chili, sweet
                                    diced onions,
                                    and house mustard on toasted milk bread.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ==========================================
           SECTION 3: LOCATION (data-driven component)
           ========================================== -->
        <LocationSchedule :location="todayLocation" :next-location="nextLocation" />

        <!-- ==========================================
           SECTION 4: FULL MENU WITH PRICES
           Image gallery, grid layout, consistent aspect ratios,
           generous spacing, 6 explicit sample items with real names/prices in ¥
           ========================================== -->
        <section id="full-menu" class="py-12 md:py-16 bg-warm-white">
            <div class="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Section Header -->
                <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <span class="text-xs font-bold tracking-widest text-truck-orange uppercase">
                            Handcrafted Daily
                        </span>
                        <h2 class="font-heading text-3xl sm:text-4xl font-bold text-charcoal-brown mt-1.5">
                            Full Menu &amp; Prices
                        </h2>
                        <p class="text-base text-charcoal-brown/75 mt-2 max-w-2xl">
                            Every sausage is certified 100% halal beef, topped with slow-reduced chili con carne and
                            paired with
                            toasted artisan milk buns. All prices in Japanese Yen (¥), tax inclusive.
                        </p>
                    </div>
                    <div
                        class="inline-flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-lg bg-tan-subtle border border-toasted-tan/30 text-xs font-medium text-charcoal-brown/80">
                        <span class="w-2 h-2 rounded-full bg-cheddar-yellow"></span>
                        <span>100% Halal Certified Kitchen</span>
                    </div>
                </div>

                <!-- Menu Cards Grid (6 Explicit Items - Full Image Cards with Text Overlaid) -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">

                    <!-- Item 1: Sapporo Classic Chili Dog -->
                    <article id="menu-item-1"
                        class="group relative min-h-[440px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-toasted-tan/30 shadow-sm hover:border-truck-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 sm:p-7">
                        <!-- Full Card Background Image -->
                        <img src="https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=1000&q=85"
                            alt="The Sapporo Classic Chili Dog" referrerpolicy="no-referrer"
                            class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <!-- Editorial Dark Scrim for Pristine Contrast -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75 transition-colors duration-300">
                        </div>

                        <!-- Top Row Overlay: Badges & Price -->
                        <div class="relative z-10 flex items-start justify-between gap-2">
                            <span
                                class="bg-cheddar-yellow text-charcoal-brown text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                                100% Halal
                            </span>
                            <span
                                class="bg-warm-white/95 backdrop-blur-md text-charcoal-brown font-heading font-bold text-base px-3.5 py-1 rounded-lg border border-toasted-tan/30 shadow-sm">
                                ¥950
                            </span>
                        </div>

                        <!-- Bottom Content Overlay: Title, Spice, Description & Ingredients -->
                        <div class="relative z-10 flex flex-col space-y-3 pt-12">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-heading text-2xl font-bold text-warm-white tracking-tight">
                                    The Sapporo Classic
                                </h3>
                                <span class="text-xs text-cheddar-yellow font-semibold shrink-0" title="Mild Spice">●
                                    Mild</span>
                            </div>
                            <p class="text-sm text-warm-white/85 leading-relaxed">
                                Signature halal beef frankfurter, 12-hour simmered Texas-Hokkaido beef chili, sweet
                                diced onions, and
                                stone-ground mustard on toasted Hokkaido milk bread.
                            </p>
                            <div
                                class="pt-3 border-t border-warm-white/20 flex items-center justify-between text-xs text-warm-white/70 font-medium">
                                <span>Hokkaido Brioche Bun</span>
                                <span>100% Halal Beef</span>
                            </div>
                        </div>
                    </article>

                    <!-- Item 2: Tokachi Cheddar Melt Chili Dog -->
                    <article id="menu-item-2"
                        class="group relative min-h-[440px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-toasted-tan/30 shadow-sm hover:border-truck-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 sm:p-7">
                        <!-- Full Card Background Image -->
                        <img src="https://images.unsplash.com/photo-1627059174044-6725ea95d2c2?auto=format&fit=crop&w=1000&q=85"
                            alt="Tokachi Cheddar Melt Chili Dog" referrerpolicy="no-referrer"
                            class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <!-- Editorial Dark Scrim for Pristine Contrast -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75 transition-colors duration-300">
                        </div>

                        <!-- Top Row Overlay: Badges & Price -->
                        <div class="relative z-10 flex items-start justify-between gap-2">
                            <span
                                class="bg-cheddar-yellow text-charcoal-brown text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                                100% Halal
                            </span>
                            <span
                                class="bg-warm-white/95 backdrop-blur-md text-charcoal-brown font-heading font-bold text-base px-3.5 py-1 rounded-lg border border-toasted-tan/30 shadow-sm">
                                ¥1,100
                            </span>
                        </div>

                        <!-- Bottom Content Overlay -->
                        <div class="relative z-10 flex flex-col space-y-3 pt-12">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-heading text-2xl font-bold text-warm-white tracking-tight">
                                    Tokachi Cheddar Melt
                                </h3>
                                <span class="text-xs text-cheddar-yellow font-semibold shrink-0" title="Medium Spice">●●
                                    Medium</span>
                            </div>
                            <p class="text-sm text-warm-white/85 leading-relaxed">
                                Halal beef sausage smothered in spicy beef chili, warm melted cheese sauce made with
                                aged Tokachi
                                dairy cheddar, pickled jalapeño coins, and crispy shallots.
                            </p>
                            <div
                                class="pt-3 border-t border-warm-white/20 flex items-center justify-between text-xs text-warm-white/70 font-medium">
                                <span>Tokachi Dairy Cheddar</span>
                                <span>Pickled Jalapeño</span>
                            </div>
                        </div>
                    </article>

                    <!-- Item 3: Yuzu-Pepper Slaw Chili Dog -->
                    <article id="menu-item-3"
                        class="group relative min-h-[440px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-toasted-tan/30 shadow-sm hover:border-truck-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 sm:p-7">
                        <!-- Full Card Background Image -->
                        <img src="https://images.unsplash.com/photo-1541214113241-21578d2d9b62?auto=format&fit=crop&w=1000&q=85"
                            alt="Yuzu-Pepper Slaw Chili Dog" referrerpolicy="no-referrer"
                            class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <!-- Editorial Dark Scrim for Pristine Contrast -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75 transition-colors duration-300">
                        </div>

                        <!-- Top Row Overlay: Badges & Price -->
                        <div class="relative z-10 flex items-start justify-between gap-2">
                            <span
                                class="bg-cheddar-yellow text-charcoal-brown text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                                100% Halal
                            </span>
                            <span
                                class="bg-warm-white/95 backdrop-blur-md text-charcoal-brown font-heading font-bold text-base px-3.5 py-1 rounded-lg border border-toasted-tan/30 shadow-sm">
                                ¥1,050
                            </span>
                        </div>

                        <!-- Bottom Content Overlay -->
                        <div class="relative z-10 flex flex-col space-y-3 pt-12">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-heading text-2xl font-bold text-warm-white tracking-tight">
                                    Yuzu-Kosho Slaw Dog
                                </h3>
                                <span class="text-xs text-cheddar-yellow font-semibold shrink-0" title="Tangy & Mild">●
                                    Tangy</span>
                            </div>
                            <p class="text-sm text-warm-white/85 leading-relaxed">
                                Crisp shredded Hokkaido green cabbage tossed in citrusy green yuzu kosho vinaigrette,
                                layered over
                                hearty halal chili and juicy beef frank. Refreshing contrast.
                            </p>
                            <div
                                class="pt-3 border-t border-warm-white/20 flex items-center justify-between text-xs text-warm-white/70 font-medium">
                                <span>Fresh Cabbage Slaw</span>
                                <span>Yuzu Citrus Zing</span>
                            </div>
                        </div>
                    </article>

                    <!-- Item 4: Habanero Fire Limited Special -->
                    <article id="menu-item-4"
                        class="group relative min-h-[440px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-toasted-tan/30 shadow-sm hover:border-chili-red/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 sm:p-7">
                        <!-- Full Card Background Image -->
                        <img src="https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=1000&q=85"
                            alt="Habanero Fire Chili Dog" referrerpolicy="no-referrer"
                            class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <!-- Editorial Dark Scrim for Pristine Contrast -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75 transition-colors duration-300">
                        </div>

                        <!-- Top Row Overlay: Badges & Price -->
                        <div class="relative z-10 flex items-start justify-between gap-2">
                            <span class="bg-chili-red text-warm-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                                Limited Daily Batch
                            </span>
                            <span
                                class="bg-warm-white/95 backdrop-blur-md text-charcoal-brown font-heading font-bold text-base px-3.5 py-1 rounded-lg border border-toasted-tan/30 shadow-sm">
                                ¥1,150
                            </span>
                        </div>

                        <!-- Bottom Content Overlay -->
                        <div class="relative z-10 flex flex-col space-y-3 pt-12">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-heading text-2xl font-bold text-warm-white tracking-tight">
                                    Habanero Fire Dog
                                </h3>
                                <span class="text-xs text-chili-red font-semibold shrink-0" title="Hot Spice Level">●●●
                                    Spicy</span>
                            </div>
                            <p class="text-sm text-warm-white/85 leading-relaxed">
                                For heat lovers: double-spiced halal chili infused with charred habanero peppers, smoked
                                paprika
                                cream, fresh cilantro, and toasted sesame seeds.
                            </p>
                            <div
                                class="pt-3 border-t border-warm-white/20 flex items-center justify-between text-xs text-warm-white/70 font-medium">
                                <span>Charred Habanero</span>
                                <span>Cool Cilantro Cream</span>
                            </div>
                        </div>
                    </article>

                    <!-- Item 5: Hokkaido Russet Fries -->
                    <article id="menu-item-5"
                        class="group relative min-h-[440px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-toasted-tan/30 shadow-sm hover:border-truck-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 sm:p-7">
                        <!-- Full Card Background Image -->
                        <img src="https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1000&q=85"
                            alt="Crisp Hokkaido Russet Cut Fries" referrerpolicy="no-referrer"
                            class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <!-- Editorial Dark Scrim for Pristine Contrast -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75 transition-colors duration-300">
                        </div>

                        <!-- Top Row Overlay: Badges & Price -->
                        <div class="relative z-10 flex items-start justify-between gap-2">
                            <span
                                class="bg-cheddar-yellow text-charcoal-brown text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                                Side
                            </span>
                            <span
                                class="bg-warm-white/95 backdrop-blur-md text-charcoal-brown font-heading font-bold text-base px-3.5 py-1 rounded-lg border border-toasted-tan/30 shadow-sm">
                                ¥500
                            </span>
                        </div>

                        <!-- Bottom Content Overlay -->
                        <div class="relative z-10 flex flex-col space-y-3 pt-12">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-heading text-2xl font-bold text-warm-white tracking-tight">
                                    Kutchan Russet Fries
                                </h3>
                                <span class="text-xs text-warm-white/80 font-medium shrink-0">Vegetarian</span>
                            </div>
                            <p class="text-sm text-warm-white/85 leading-relaxed">
                                Thick-cut Hokkaido Kutchan potato wedges double-fried to golden crispness, dusted with
                                Okhotsk sea
                                salt and smoked Spanish paprika. Served with garlic dip.
                            </p>
                            <div
                                class="pt-3 border-t border-warm-white/20 flex items-center justify-between text-xs text-warm-white/70 font-medium">
                                <span>Hokkaido Kutchan Potatoes</span>
                                <span>Okhotsk Sea Salt</span>
                            </div>
                        </div>
                    </article>

                    <!-- Item 6: House-Crafted Botanist Cola -->
                    <article id="menu-item-6"
                        class="group relative min-h-[440px] sm:min-h-[480px] rounded-2xl overflow-hidden border border-toasted-tan/30 shadow-sm hover:border-truck-orange/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between p-6 sm:p-7">
                        <!-- Full Card Background Image -->
                        <img src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=85"
                            alt="House-Brewed Spiced Craft Botanist Cola" referrerpolicy="no-referrer"
                            class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <!-- Editorial Dark Scrim for Pristine Contrast -->
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75 transition-colors duration-300">
                        </div>

                        <!-- Top Row Overlay: Badges & Price -->
                        <div class="relative z-10 flex items-start justify-between gap-2">
                            <span
                                class="bg-cheddar-yellow text-charcoal-brown text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                                Drink
                            </span>
                            <span
                                class="bg-warm-white/95 backdrop-blur-md text-charcoal-brown font-heading font-bold text-base px-3.5 py-1 rounded-lg border border-toasted-tan/30 shadow-sm">
                                ¥450
                            </span>
                        </div>

                        <!-- Bottom Content Overlay -->
                        <div class="relative z-10 flex flex-col space-y-3 pt-12">
                            <div class="flex items-baseline justify-between gap-2">
                                <h3 class="font-heading text-2xl font-bold text-warm-white tracking-tight">
                                    Spiced Botanist Cola
                                </h3>
                                <span class="text-xs text-warm-white/80 font-medium shrink-0">Non-Alcoholic</span>
                            </div>
                            <p class="text-sm text-warm-white/85 leading-relaxed">
                                Brewed in small batches with cinnamon bark, clove, cardamom, fresh lemon peel, and pure
                                Hokkaido beet
                                sugar. Effervescent, herbal, and refreshing.
                            </p>
                            <div
                                class="pt-3 border-t border-warm-white/20 flex items-center justify-between text-xs text-warm-white/70 font-medium">
                                <span>Whole Spices &amp; Citrus</span>
                                <span>Hokkaido Beet Sugar</span>
                            </div>
                        </div>
                    </article>

                </div>

                <!-- Combo Notice Box -->
                <div
                    class="mt-12 p-5 sm:p-6 rounded-2xl bg-tan-subtle border border-toasted-tan/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div class="text-center sm:text-left">
                        <span class="font-heading text-base font-bold text-charcoal-brown">Truck Combo Special:</span>
                        <span class="text-sm text-charcoal-brown/80 ml-2">Add Kutchan Russet Fries &amp; Craft Cola to
                            any dog for
                            just <strong class="text-truck-orange font-bold">+¥700</strong></span>
                    </div>
                    <a id="menu-find-truck-btn" href="#location-schedule"
                        class="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-semibold text-warm-white bg-truck-orange hover:bg-cheddar-yellow hover:text-charcoal-brown transition-all shadow-2xs shrink-0">
                        Order at the Window
                    </a>
                </div>

            </div>
        </section>

        <!-- ==========================================
           SECTION 5: ABOUT / STORY
           Tells the story of the food truck and why it exists.
           Includes an owner photo alongside the story text.
           ========================================== -->
        <section id="our-story" class="py-12 md:py-16 bg-warm-white">
            <div class="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    <!-- Owner Photo Column (5 cols) -->
                    <div class="lg:col-span-5 order-2 lg:order-1">
                        <div id="owner-photo-container"
                            class="relative rounded-2xl overflow-hidden border border-toasted-tan/35 bg-tan-subtle shadow-sm group">
                            <img id="owner-portrait-img"
                                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80"
                                alt="Kenji and Tariq, co-founders and chefs of Kita Halal Chili Dogs inside their Sapporo food truck kitchen"
                                referrerpolicy="no-referrer"
                                class="w-full aspect-[4/5] object-cover object-center group-hover:scale-102 transition-transform duration-500" />

                            <!-- Editorial Photo Caption Overlay -->
                            <div class="p-4 bg-warm-white border-t border-toasted-tan/25 text-left">
                                <p class="font-heading text-sm font-bold text-charcoal-brown">
                                    Kenji Sato &amp; Tariq Al-Mansoor
                                </p>
                                <p class="text-xs text-charcoal-brown/70 mt-0.5">
                                    Co-founders &amp; Head Cooks, Kita Halal Chili Dogs Sapporo
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Story Narrative Column (7 cols) -->
                    <div class="lg:col-span-7 order-1 lg:order-2 space-y-6">
                        <div>
                            <span class="text-xs font-bold tracking-widest text-truck-orange uppercase">
                                Our Origins &amp; Mission
                            </span>
                            <h2
                                class="font-heading text-3xl sm:text-4xl font-bold text-charcoal-brown mt-1.5 leading-tight">
                                Why We Built Sapporo's First Halal Chili Dog Van
                            </h2>
                        </div>

                        <div class="space-y-4 text-base text-charcoal-brown/85 leading-relaxed">
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
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                            <div class="p-4 rounded-xl bg-tan-subtle border border-toasted-tan/25">
                                <span class="font-heading text-2xl font-bold text-truck-orange block">100%</span>
                                <span class="text-xs font-semibold text-charcoal-brown">Halal Sourced</span>
                                <p class="text-[11px] text-charcoal-brown/70 mt-1">Every cut of beef rigorously
                                    certified.</p>
                            </div>
                            <div class="p-4 rounded-xl bg-tan-subtle border border-toasted-tan/25">
                                <span class="font-heading text-2xl font-bold text-truck-orange block">12 Hrs</span>
                                <span class="text-xs font-semibold text-charcoal-brown">Slow Simmer</span>
                                <p class="text-[11px] text-charcoal-brown/70 mt-1">Rich depth of cumin, garlic &amp;
                                    chilies.</p>
                            </div>
                            <div class="p-4 rounded-xl bg-tan-subtle border border-toasted-tan/25">
                                <span class="font-heading text-2xl font-bold text-truck-orange block">Local</span>
                                <span class="text-xs font-semibold text-charcoal-brown">Hokkaido Buns</span>
                                <p class="text-[11px] text-charcoal-brown/70 mt-1">Baked fresh daily in Sapporo.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- ==========================================
           SECTION 6: ALLERGEN & DIETARY INFO
           Halal sourcing note, common allergens (dairy/gluten/nuts),
           simple readable format (short paragraphs/light list, not dense table)
           ========================================== -->
        <section id="allergen-dietary" class="py-12 md:py-16 bg-warm-white">
            <div class="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Section Heading -->
                <div class="max-w-3xl mb-12">
                    <span class="text-xs font-bold tracking-widest text-truck-orange uppercase">
                        Transparency &amp; Care
                    </span>
                    <h2 class="font-heading text-3xl sm:text-4xl font-bold text-charcoal-brown mt-1.5">
                        Allergen &amp; Dietary Information
                    </h2>
                    <p class="text-base text-charcoal-brown/75 mt-2">
                        We take kitchen integrity and guest safety seriously. Below is an honest breakdown of our
                        sourcing,
                        preparation methods, and allergen management.
                    </p>
                </div>

                <!-- Clean Informational Cards (Readable Short Paragraphs & Clean List) -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                    <!-- Card 1: Halal Sourcing Certification -->
                    <div class="p-6 sm:p-8 rounded-2xl bg-tan-subtle border border-toasted-tan/30 space-y-3">
                        <div
                            class="w-9 h-9 rounded-xl bg-warm-white border border-toasted-tan/30 flex items-center justify-center text-cheddar-yellow">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                            100% Halal Sourcing Guarantee
                        </h3>
                        <p class="text-sm text-charcoal-brown/80 leading-relaxed">
                            All beef used in our sausages and chili con carne is procured from licensed Halal-certified
                            suppliers in
                            New Zealand and Hokkaido. Our kitchen operates under strict zero-pork, zero-lard, and
                            zero-alcohol
                            standards. We do not use cooking wine, sake, or mirin in any sauces or seasonings.
                        </p>
                        <div class="pt-2 text-xs font-semibold text-charcoal-brown/70 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-truck-orange"></span>
                            Halal certification documents are available at the truck counter upon request.
                        </div>
                    </div>

                    <!-- Card 2: Gluten & Wheat Details -->
                    <div class="p-6 sm:p-8 rounded-2xl bg-tan-subtle border border-toasted-tan/30 space-y-3">
                        <div
                            class="w-9 h-9 rounded-xl bg-warm-white border border-toasted-tan/30 flex items-center justify-center text-truck-orange">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <path d="M6 2v20M18 2v20M6 12h12" />
                            </svg>
                        </div>
                        <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                            Gluten &amp; Wheat Buns
                        </h3>
                        <p class="text-sm text-charcoal-brown/80 leading-relaxed">
                            Our standard brioche buns are made from local Hokkaido wheat flour and contain gluten. For
                            guests
                            avoiding gluten, we gladly offer any chili dog served as a <strong>"Lettuce-Boat
                                Dog"</strong> wrapped
                            in fresh, crisp Hokkaido romaine leaves at no extra charge. Our chili sauce itself is
                            gluten-free.
                        </p>
                        <div class="pt-2 text-xs font-semibold text-charcoal-brown/70 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-truck-orange"></span>
                            Please notify the order window if you require lettuce-wrap preparation.
                        </div>
                    </div>

                    <!-- Card 3: Dairy & Cheese Management -->
                    <div class="p-6 sm:p-8 rounded-2xl bg-tan-subtle border border-toasted-tan/30 space-y-3">
                        <div
                            class="w-9 h-9 rounded-xl bg-warm-white border border-toasted-tan/30 flex items-center justify-center text-cheddar-yellow">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 3v18" />
                                <path d="M3 12h18" />
                            </svg>
                        </div>
                        <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                            Dairy &amp; Cheese Allergens
                        </h3>
                        <p class="text-sm text-charcoal-brown/80 leading-relaxed">
                            Our cheddar melt dog features cheese made with pasteurized Hokkaido cow's milk. In addition,
                            our
                            standard buns are gently toasted with a touch of butter. If you have a dairy allergy or
                            lactose
                            intolerance, simply ask for <strong>"Dairy-Free Preparation"</strong>—we will toast your bun
                            dry or
                            provide a lettuce wrap with dairy-free chili.
                        </p>
                        <div class="pt-2 text-xs font-semibold text-charcoal-brown/70 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-truck-orange"></span>
                            Classic Chili Dog can easily be made 100% dairy-free.
                        </div>
                    </div>

                    <!-- Card 4: Nuts & Shellfish Safety -->
                    <div class="p-6 sm:p-8 rounded-2xl bg-tan-subtle border border-toasted-tan/30 space-y-3">
                        <div
                            class="w-9 h-9 rounded-xl bg-warm-white border border-toasted-tan/30 flex items-center justify-center text-truck-orange">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                            </svg>
                        </div>
                        <h3 class="font-heading text-xl font-bold text-charcoal-brown">
                            Nut-Free &amp; Shellfish-Free Kitchen
                        </h3>
                        <p class="text-sm text-charcoal-brown/80 leading-relaxed">
                            Our food truck operates an exclusively peanut-free and tree-nut-free prep area. We also do
                            not store,
                            prepare, or fry any shellfish or seafood in our truck, completely preventing
                            cross-contamination risks
                            for guests with seafood allergies.
                        </p>
                        <div class="pt-2 text-xs font-semibold text-charcoal-brown/70 flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-truck-orange"></span>
                            Frying oil for fries is 100% vegetable oil and never shared with animal proteins.
                        </div>
                    </div>

                </div>

                <!-- Bottom Allergen Consultation Note -->
                <div
                    class="mt-8 p-4 rounded-xl bg-warm-white border border-toasted-tan/30 text-xs text-charcoal-brown/75 flex items-center gap-3">
                    <span class="text-truck-orange font-bold text-base">ℹ</span>
                    <span>Have a specific dietary concern not listed above? Please speak directly with our head cook at
                        the
                        window or send an email prior to visiting.</span>
                </div>

            </div>
        </section>

        <!-- ==========================================
           SECTION 7: FAQ
           Where to buy/find the truck, ingredients used,
           accordion / stacked Q&A format, calm aesthetic
           ========================================== -->
        <section id="faq-section" class="py-12 md:py-16 bg-warm-white">
            <div class="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

                <!-- Section Heading -->
                <div class="text-center max-w-2xl mx-auto mb-12">
                    <span class="text-xs font-bold tracking-widest text-truck-orange uppercase">
                        Questions &amp; Answers
                    </span>
                    <h2 class="font-heading text-3xl sm:text-4xl font-bold text-charcoal-brown mt-1.5">
                        Frequently Asked Questions
                    </h2>
                    <p class="text-base text-charcoal-brown/75 mt-2">
                        Everything you need to know about finding our truck and enjoying our halal menu in Sapporo.
                    </p>
                </div>

                <!-- Stacked Q&A Accordion Container -->
                <div class="max-w-3xl mx-auto space-y-4">

                    <!-- FAQ Item 1: Where to find / buy the truck -->
                    <div id="faq-item-1"
                        class="faq-card border border-toasted-tan/30 rounded-2xl bg-warm-white overflow-hidden transition-colors">
                        <button type="button"
                            class="faq-toggle-btn w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange"
                            aria-expanded="true" aria-controls="faq-answer-1">
                            <span class="font-heading text-lg font-bold text-charcoal-brown">
                                Where can I find and buy from your food truck?
                            </span>
                            <span
                                class="faq-icon-wrapper w-7 h-7 rounded-full bg-tan-subtle flex items-center justify-center shrink-0 text-charcoal-brown transition-transform duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div id="faq-answer-1"
                            class="faq-content px-6 pb-6 pt-1 text-sm text-charcoal-brown/80 leading-relaxed border-t border-toasted-tan/15">
                            Our food truck operates across designated public spots in central Sapporo from Wednesday
                            through Sunday.
                            Typical regular locations include Odori Park (Block 6), Sapporo Station North Plaza, and
                            Maruyama Park
                            entrance during festival weekends. You can check the live location module at the top of this
                            website or
                            follow our Instagram stories (@kitachilidogs_sapporo), which update at 9:00 AM each morning
                            with the
                            exact GPS pin and opening hours.
                        </div>
                    </div>

                    <!-- FAQ Item 2: Ingredients used -->
                    <div id="faq-item-2"
                        class="faq-card border border-toasted-tan/30 rounded-2xl bg-warm-white overflow-hidden transition-colors">
                        <button type="button"
                            class="faq-toggle-btn w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange"
                            aria-expanded="false" aria-controls="faq-answer-2">
                            <span class="font-heading text-lg font-bold text-charcoal-brown">
                                What ingredients are used in your chili dogs and buns?
                            </span>
                            <span
                                class="faq-icon-wrapper w-7 h-7 rounded-full bg-tan-subtle flex items-center justify-center shrink-0 text-charcoal-brown transition-transform duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div id="faq-answer-2"
                            class="faq-content hidden px-6 pb-6 pt-1 text-sm text-charcoal-brown/80 leading-relaxed border-t border-toasted-tan/15">
                            Our chili is made from coarse-ground 100% Halal beef brisket, stewed for 12 hours with
                            peeled San
                            Marzano tomatoes, sweet Hokkaido onions, roasted garlic, toasted cumin, Mexican ancho
                            peppers, and
                            smoked paprika. Our sausages are casing-stuffed 100% halal beef franks. The buns are custom
                            brioche
                            baked daily using Ebetsu wheat flour, water, yeast, a touch of butter, and Hokkaido milk. We
                            never use
                            MSG, pork fat, or artificial preservatives.
                        </div>
                    </div>

                    <!-- FAQ Item 3: Halal Certification Process -->
                    <div id="faq-item-3"
                        class="faq-card border border-toasted-tan/30 rounded-2xl bg-warm-white overflow-hidden transition-colors">
                        <button type="button"
                            class="faq-toggle-btn w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange"
                            aria-expanded="false" aria-controls="faq-answer-3">
                            <span class="font-heading text-lg font-bold text-charcoal-brown">
                                How is your beef certified Halal?
                            </span>
                            <span
                                class="faq-icon-wrapper w-7 h-7 rounded-full bg-tan-subtle flex items-center justify-center shrink-0 text-charcoal-brown transition-transform duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div id="faq-answer-3"
                            class="faq-content hidden px-6 pb-6 pt-1 text-sm text-charcoal-brown/80 leading-relaxed border-t border-toasted-tan/15">
                            All raw beef cuts are procured with formal Halal compliance certificates issued by
                            recognized Islamic
                            certification authorities (including FIANZ and regional Japan Halal associations). All
                            equipment,
                            steamers, and griddles on our truck are dedicated exclusively to halal beef and vegetarian
                            side items.
                        </div>
                    </div>

                    <!-- FAQ Item 4: Payment Methods -->
                    <div id="faq-item-4"
                        class="faq-card border border-toasted-tan/30 rounded-2xl bg-warm-white overflow-hidden transition-colors">
                        <button type="button"
                            class="faq-toggle-btn w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange"
                            aria-expanded="false" aria-controls="faq-answer-4">
                            <span class="font-heading text-lg font-bold text-charcoal-brown">
                                What payment methods do you accept at the food truck window?
                            </span>
                            <span
                                class="faq-icon-wrapper w-7 h-7 rounded-full bg-tan-subtle flex items-center justify-center shrink-0 text-charcoal-brown transition-transform duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div id="faq-answer-4"
                            class="faq-content hidden px-6 pb-6 pt-1 text-sm text-charcoal-brown/80 leading-relaxed border-t border-toasted-tan/15">
                            We accept Japanese Yen cash (¥), Japanese transit IC cards (Kitaca, Suica, Pasmo, Icoca),
                            PayPay QR
                            payment, and major credit/debit cards (Visa, Mastercard, American Express, JCB) via
                            contactless tap to
                            pay.
                        </div>
                    </div>

                    <!-- FAQ Item 5: Private Catering & University Events -->
                    <div id="faq-item-5"
                        class="faq-card border border-toasted-tan/30 rounded-2xl bg-warm-white overflow-hidden transition-colors">
                        <button type="button"
                            class="faq-toggle-btn w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange"
                            aria-expanded="false" aria-controls="faq-answer-5">
                            <span class="font-heading text-lg font-bold text-charcoal-brown">
                                Can we book the orange truck for university festivals or private events?
                            </span>
                            <span
                                class="faq-icon-wrapper w-7 h-7 rounded-full bg-tan-subtle flex items-center justify-center shrink-0 text-charcoal-brown transition-transform duration-200">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </span>
                        </button>
                        <div id="faq-answer-5"
                            class="faq-content hidden px-6 pb-6 pt-1 text-sm text-charcoal-brown/80 leading-relaxed border-t border-toasted-tan/15">
                            Yes! We frequently cater at Hokkaido University events, international cultural fairs, ski
                            lodge pop-ups,
                            and corporate retreats around Sapporo and Otaru. Please reach out via our contact email at
                            least two
                            weeks in advance with your expected guest count.
                        </div>
                    </div>

                </div>

            </div>
        </section>
    </PublicLayout>
</template>