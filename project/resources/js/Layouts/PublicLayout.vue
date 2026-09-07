<script setup>
import { ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
  title: {
    type: String,
    default: 'Halal Chili Dog Food Truck',
  },
  description: {
    type: String,
    default: 'A calm, editorial single-page landing page for a halal chili dog food truck operating in Sapporo, Japan.',
  },
});

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}
</script>

<template>

  <Head :title="title">
    <meta name="description" :content="description" />
    <meta name="keywords"
      content="halal food truck Sapporo, halal chili dog, halal chili dogs, halal food Japan, chili dog food truck, halal street food Sapporo" />
    <meta property="og:title" :content="title" />
    <meta property="og:description" :content="description" />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Google Fonts: Outfit & Plus Jakarta Sans -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
      rel="stylesheet" />
  </Head>

  <div
    class="bg-warm-white text-charcoal-brown min-h-screen flex flex-col selection:bg-truck-orange/15 selection:text-charcoal-brown">
    <!-- Simple Top Header Navigation -->
    <header id="main-navigation"
      class="sticky top-0 z-50 w-full bg-warm-white/95 backdrop-blur-md border-b border-toasted-tan/25 transition-colors duration-200">
      <div class="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo & Identity -->
        <a id="nav-logo-link" href="#main-hero"
          class="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange rounded-lg"
          aria-label="Kita Halal Chili Dogs Home">
          <div id="nav-logo-badge"
            class="w-10 h-10 rounded-xl bg-truck-orange flex items-center justify-center text-warm-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            <!-- Stylized Food Truck Emblem -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
              <path d="M15 18H9" />
              <path d="M19 18h2a1 1 0 0 0 1-1v-5.2a2 2 0 0 0-.586-1.414l-2.8-2.8A2 2 0 0 0 17.2 7H14v11h1" />
              <circle cx="7" cy="18" r="2" />
              <circle cx="17" cy="18" r="2" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-heading text-lg sm:text-xl font-bold tracking-tight text-charcoal-brown leading-tight">
              KITA CHILI DOGS
            </span>
            <span class="text-[11px] font-medium tracking-widest text-charcoal-brown/70 uppercase">
              Sapporo • 100% Halal
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav id="desktop-nav" class="hidden md:flex items-center gap-8 text-sm font-medium text-charcoal-brown/85">
          <a id="nav-link-location" href="#location-schedule"
            class="hover:text-truck-orange transition-colors duration-150 py-1">
            Today's Spot
          </a>
          <a id="nav-link-menu" href="#full-menu" class="hover:text-truck-orange transition-colors duration-150 py-1">
            Menu &amp; Prices
          </a>
          <a id="nav-link-story" href="#our-story" class="hover:text-truck-orange transition-colors duration-150 py-1">
            Our Story
          </a>
          <a id="nav-link-dietary" href="#allergen-dietary"
            class="hover:text-truck-orange transition-colors duration-150 py-1">
            Halal &amp; Allergens
          </a>
          <a id="nav-link-faq" href="#faq-section" class="hover:text-truck-orange transition-colors duration-150 py-1">
            FAQ
          </a>
          <!-- Nav Primary CTA -->
          <a id="nav-cta-btn" href="#location-schedule"
            class="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold tracking-wide text-warm-white bg-truck-orange hover:bg-cheddar-yellow hover:text-charcoal-brown transition-all duration-200 shadow-sm">
            Find Truck Today
          </a>
        </nav>

        <!-- Mobile Hamburger Toggle Button -->
        <button id="mobile-menu-btn" type="button" @click="toggleMobileMenu"
          class="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl text-charcoal-brown border border-toasted-tan/30 hover:bg-tan-subtle focus:outline-none focus:ring-2 focus:ring-truck-orange transition-colors"
          :aria-expanded="isMobileMenuOpen" aria-label="Toggle navigation menu" aria-controls="mobile-menu-drawer">
          <svg id="hamburger-icon" class="w-6 h-6" :class="isMobileMenuOpen ? 'hidden' : 'block'" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
          <svg id="close-icon" class="w-6 h-6" :class="isMobileMenuOpen ? 'block' : 'hidden'" fill="none"
            stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div id="mobile-menu-drawer" class="md:hidden grid transition-[grid-template-rows] duration-300 ease-in-out"
        :class="isMobileMenuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
        <div class="overflow-hidden">
          <div class="border-b border-toasted-tan/25 bg-warm-white px-5 pt-3 pb-6 space-y-3">
            <a id="mobile-link-location" href="#location-schedule" @click="closeMobileMenu"
              class="block py-2.5 px-3 rounded-lg text-base font-medium text-charcoal-brown hover:bg-tan-subtle hover:text-truck-orange transition-colors">
              Today's Location &amp; Schedule
            </a>
            <a id="mobile-link-menu" href="#full-menu" @click="closeMobileMenu"
              class="block py-2.5 px-3 rounded-lg text-base font-medium text-charcoal-brown hover:bg-tan-subtle hover:text-truck-orange transition-colors">
              Full Menu &amp; Prices
            </a>
            <a id="mobile-link-story" href="#our-story" @click="closeMobileMenu"
              class="block py-2.5 px-3 rounded-lg text-base font-medium text-charcoal-brown hover:bg-tan-subtle hover:text-truck-orange transition-colors">
              Our Story
            </a>
            <a id="mobile-link-dietary" href="#allergen-dietary" @click="closeMobileMenu"
              class="block py-2.5 px-3 rounded-lg text-base font-medium text-charcoal-brown hover:bg-tan-subtle hover:text-truck-orange transition-colors">
              Halal Sourcing &amp; Allergens
            </a>
            <a id="mobile-link-faq" href="#faq-section" @click="closeMobileMenu"
              class="block py-2.5 px-3 rounded-lg text-base font-medium text-charcoal-brown hover:bg-tan-subtle hover:text-truck-orange transition-colors">
              FAQ
            </a>
            <div class="pt-2">
              <a id="mobile-link-cta" href="#location-schedule" @click="closeMobileMenu"
                class="flex items-center justify-center w-full py-3 px-4 rounded-xl text-sm font-semibold text-warm-white bg-truck-orange hover:bg-cheddar-yellow hover:text-charcoal-brown transition-colors shadow-sm">
                See Today's Location
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Dynamic Page Content Slot -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- ==========================================
         SECTION 8: FOOTER
         Three-column layout:
         1. Truck name/logo & short description
         2. Contact information (email, phone)
         3. Social / Follow Us links (Instagram, TikTok)
         Bottom bar with copyright line
         ========================================== -->
    <footer id="main-footer" class="bg-warm-white border-t border-toasted-tan/25 text-charcoal-brown pt-16 pb-12">
      <div class="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Three Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 pb-12 border-b border-toasted-tan/20">

          <!-- Column 1: Truck name/logo, short description -->
          <div id="footer-col-brand" class="space-y-4">
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-truck-orange flex items-center justify-center text-warm-white shadow-2xs">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                  <path d="M15 18H9" />
                  <path d="M19 18h2a1 1 0 0 0 1-1v-5.2a2 2 0 0 0-.586-1.414l-2.8-2.8A2 2 0 0 0 17.2 7H14v11h1" />
                  <circle cx="7" cy="18" r="2" />
                  <circle cx="17" cy="18" r="2" />
                </svg>
              </div>
              <span class="font-heading text-xl font-bold tracking-tight text-charcoal-brown">
                KITA CHILI DOGS
              </span>
            </div>
            <p class="text-sm text-charcoal-brown/75 leading-relaxed">
              Sapporo's original 100% halal chili dog food truck. Crafted with slow-simmered beef, fresh Hokkaido milk
              buns, and genuine northern warmth.
            </p>
            <div class="inline-flex items-center gap-2 text-xs font-semibold text-cheddar-yellow">
              <span>★</span>
              <span>Halal Certified Kitchen on Wheels</span>
            </div>
          </div>

          <!-- Column 2: Contact information (email, phone) -->
          <div id="footer-col-contact" class="space-y-4">
            <h3 class="font-heading text-base font-bold uppercase tracking-wider text-charcoal-brown">
              Contact &amp; Bookings
            </h3>
            <ul class="space-y-2.5 text-sm text-charcoal-brown/80">
              <li class="flex items-center gap-2.5">
                <span class="text-truck-orange">✉</span>
                <a href="mailto:hello@kitachilidogs.jp" class="hover:text-truck-orange transition-colors">
                  hello@kitachilidogs.jp
                </a>
              </li>
              <li class="flex items-center gap-2.5">
                <span class="text-truck-orange">☎</span>
                <a href="tel:+81115550198" class="hover:text-truck-orange transition-colors">
                  +81 11-555-0198
                </a>
              </li>
              <li class="flex items-start gap-2.5 pt-1 text-xs text-charcoal-brown/65">
                <span class="text-truck-orange mt-0.5">📍</span>
                <span>Mobile Base: Chuo Ward, Sapporo, Hokkaido 060-0042, Japan</span>
              </li>
            </ul>
          </div>

          <!-- Column 3: Social / Follow Us links (Instagram, TikTok) -->
          <div id="footer-col-social" class="space-y-4">
            <h3 class="font-heading text-base font-bold uppercase tracking-wider text-charcoal-brown">
              Follow Our Truck
            </h3>
            <p class="text-sm text-charcoal-brown/75">
              Live daily morning location updates, batch announcements, and seasonal special previews.
            </p>
            <div class="flex flex-col space-y-2 text-sm font-medium">
              <a id="footer-social-instagram" href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-charcoal-brown/85 hover:text-truck-orange transition-colors">
                <svg class="w-4 h-4 text-truck-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram: @kitachilidogs_sapporo</span>
              </a>
              <a id="footer-social-tiktok" href="https://tiktok.com" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-charcoal-brown/85 hover:text-truck-orange transition-colors">
                <svg class="w-4 h-4 text-truck-orange" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c.01 1.94-.52 3.94-1.63 5.56-1.42 2.08-3.79 3.48-6.32 3.73-2.52.25-5.18-.5-7.07-2.17-2.07-1.83-3.15-4.63-2.87-7.39.27-2.75 1.92-5.18 4.41-6.42 1.83-.91 3.96-1.12 5.98-.67v4.18c-1.1-.38-2.33-.37-3.41.05-.98.39-1.77 1.18-2.14 2.18-.38 1.01-.27 2.18.29 3.09.56.91 1.53 1.53 2.59 1.69 1.15.17 2.37-.16 3.25-.92.83-.72 1.34-1.79 1.35-2.91V.02z" />
                </svg>
                <span>TikTok: @sapporochilitruck</span>
              </a>
            </div>
          </div>

        </div>

        <!-- Bottom Copyright Line -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-brown/60 gap-3">
          <p>© 2026 Kita Halal Chili Dogs Sapporo. All rights reserved.</p>
          <p class="text-center sm:text-right">
            Handcrafted with 100% Halal Certified Beef • Hokkaido, Japan
          </p>
        </div>

      </div>
    </footer>
  </div>
</template>