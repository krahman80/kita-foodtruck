<script setup>
import { computed } from 'vue';

const props = defineProps({
    location: {
        type: Object,
        default: null,
    },
    nextLocation: {
        type: Object,
        default: null,
    },
});

const open = computed(() => Boolean(props.location));

const fmtDayMonth = (d) => {
    const dt = new Date(`${d}T00:00:00`);
    return dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const hm = (t) => (t ? String(t).slice(0, 5) : '');

const landmark = computed(() => (props.location?.landmark_note ? ` (${props.location.landmark_note})` : ''));

const headline = computed(() => {
    const loc = props.location;
    if (!loc) return '';
    return `${fmtDayMonth(loc.schedule_date)} — Today we'll be at ${loc.location_name}${landmark.value}, from ${hm(loc.start_time)} to ${hm(loc.end_time)}`;
});

const nextLabel = computed(() => {
    const n = props.nextLocation;
    if (!n) return '';
    const where = n.landmark_note ? `${n.location_name} (${n.landmark_note})` : n.location_name;
    return `${fmtDayMonth(n.schedule_date)} at ${where}`;
});

const mapSrc = computed(() => {
    const loc = props.location;
    const q = loc.latitude && loc.longitude ? `${loc.latitude},${loc.longitude}` : loc.location_name;
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
});
</script>

<template>
    <!-- ==========================================
         SECTION 3: LOCATION
         Data-driven: today's scheduled entry vs. rest day.
         ========================================== -->
    <section id="location-schedule" class="bg-warm-white py-12 md:py-16">
        <div class="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">

            <!-- Section Heading -->
            <div class="mb-10 max-w-3xl">
                <span class="text-xs font-bold uppercase tracking-widest text-truck-orange">
                    Schedule &amp; Tracking
                </span>
                <h2 class="mt-1.5 font-heading text-3xl font-bold text-charcoal-brown sm:text-4xl">
                    Today's Truck Location
                </h2>
                <p class="mt-2 text-base text-charcoal-brown/75">
                    Our bright orange step van navigates central Sapporo parks and plazas Wednesday through Sunday.
                </p>
            </div>

            <!-- STATE A: ACTIVE SERVICE -->
            <div v-if="open" class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
                <!-- Information Column (5 cols) -->
                <div class="space-y-6 lg:col-span-5">
                    <div class="rounded-2xl border border-toasted-tan/30 bg-tan-subtle p-6 shadow-2xs">
                        <div
                            class="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-truck-orange">
                            <span class="h-2.5 w-2.5 animate-ping rounded-full bg-truck-orange"></span>
                            Live Service Status
                        </div>
                        <p id="today-schedule-text"
                            class="font-heading text-xl font-bold leading-snug text-charcoal-brown sm:text-2xl">
                            {{ headline }}
                        </p>
                        <div
                            class="mt-4 flex items-center justify-between border-t border-toasted-tan/25 pt-4 text-xs text-charcoal-brown/80">
                            <span>Fresh batches prepared every 45 mins</span>
                            <span class="font-semibold text-truck-orange">Open Now</span>
                        </div>
                    </div>

                    <div class="space-y-3.5 text-sm text-charcoal-brown/85">
                        <div v-if="location.address" class="flex items-start gap-3">
                            <div
                                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-toasted-tan/30 bg-warm-white text-truck-orange">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <strong class="font-semibold text-charcoal-brown">Spot Details:</strong>
                                <p class="text-charcoal-brown/75">{{ location.address }}</p>
                            </div>
                        </div>

                        <div v-if="location.transit_note" class="flex items-start gap-3">
                            <div
                                class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-toasted-tan/30 bg-warm-white text-truck-orange">
                                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    stroke-width="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                            </div>
                            <div>
                                <strong class="font-semibold text-charcoal-brown">Transit Access:</strong>
                                <p class="text-charcoal-brown/75">{{ location.transit_note }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Map Column (7 cols) -->
                <div class="lg:col-span-7">
                    <div
                        class="relative h-[340px] w-full overflow-hidden rounded-2xl border border-toasted-tan/35 bg-tan-subtle shadow-xs sm:h-[420px]">
                        <iframe :title="`${location.location_name} Food Truck Location Map`" :src="mapSrc"
                            class="h-full w-full border-0" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <div v-if="location.map_pin_note"
                            class="absolute bottom-3 left-3 rounded-lg border border-toasted-tan/30 bg-warm-white/90 px-3 py-1.5 text-xs font-semibold text-charcoal-brown shadow-xs backdrop-blur-xs">
                            📍 {{ location.map_pin_note }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- STATE B: REST DAY / HOLIDAY (no map, no time) -->
            <div v-else
                class="mx-auto max-w-3xl rounded-2xl border border-toasted-tan/35 bg-tan-subtle p-10 text-center sm:p-14">
                <div
                    class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-toasted-tan/30 bg-warm-white text-truck-orange shadow-2xs">
                    <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                </div>
                <h3 class="font-heading text-2xl font-bold text-charcoal-brown sm:text-3xl">
                    The Truck is Resting Today
                </h3>
                <p class="mx-auto mt-3 max-w-xl text-base leading-relaxed text-charcoal-brown/80">
                    Our kitchen crew is slow-simmering fresh batches of beef chili and sourcing local Hokkaido buns for
                    our upcoming stops. No active street service is scheduled for today.
                </p>
                <div v-if="nextLocation"
                    class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-warm-white border border-toasted-tan/30 text-sm font-medium text-charcoal-brown">
                    <span>Next Service:</span>
                    <strong class="font-semibold text-truck-orange">{{ nextLabel }}</strong>
                </div>
            </div>

        </div>
    </section>
</template>
