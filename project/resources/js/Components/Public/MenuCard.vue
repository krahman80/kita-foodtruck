<script setup>
import { computed } from 'vue';

const props = defineProps({
    item: { type: Object, required: true },
});

const price = computed(() => `¥${Number(props.item.price_yen).toLocaleString('en-US')}`);

const SPICE = {
    mild: { dots: '●', label: 'Mild' },
    medium: { dots: '●●', label: 'Medium' },
    hot: { dots: '●●●', label: 'Hot' },
    tangy: { dots: '●', label: 'Tangy' },
};

const spice = computed(() => SPICE[props.item.spice_level] ?? { dots: '', label: '' });

const badge = computed(() => {
    switch (props.item.badge_type) {
        case 'limited_batch':
            return { text: 'Limited Daily Batch', cls: 'bg-chili-red text-warm-white' };
        case 'none':
            return null;
        default:
            return { text: '100% Halal', cls: 'bg-cheddar-yellow text-charcoal-brown' };
    }
});
</script>

<template>
    <article
        class="group relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-2xl border border-toasted-tan/30 p-6 shadow-sm transition-all duration-300 hover:border-truck-orange/50 hover:shadow-md sm:min-h-[480px] sm:p-7">
        <!-- Full-card background image -->
        <img :src="item.image_url" :alt="item.image_alt_text" loading="lazy" decoding="async"
            referrerpolicy="no-referrer"
            class="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" />
        <!-- Sold-out scrim overlay -->
        <div v-if="item.is_sold_out" class="absolute inset-0 bg-charcoal-brown/55"></div>

        <!-- Editorial dark scrim -->
        <div
            class="absolute inset-0 bg-gradient-to-t from-charcoal-brown/95 via-charcoal-brown/70 to-charcoal-brown/40 transition-colors duration-300 group-hover:from-charcoal-brown/98 group-hover:via-charcoal-brown/75">
        </div>

        <!-- Top row: badge & price -->
        <div class="relative z-10 flex items-start justify-between gap-2">
            <span v-if="badge" class="rounded-md px-3 py-1 text-xs font-bold shadow-sm" :class="badge.cls">
                {{ badge.text }}
            </span>
            <span
                class="rounded-lg border border-toasted-tan/30 bg-warm-white/95 px-3.5 py-1 font-heading text-base font-bold text-charcoal-brown shadow-sm backdrop-blur-md">
                {{ price }}
            </span>
        </div>

        <!-- Sold-out tag -->
        <div v-if="item.is_sold_out"
            class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-[-6deg] rounded-lg bg-chili-red px-4 py-1.5 font-heading text-sm font-bold uppercase tracking-wider text-warm-white shadow-lg">
            Sold Out
        </div>

        <!-- Bottom content -->
        <div class="relative z-10 flex flex-col space-y-3 pt-12">
            <div class="flex items-baseline justify-between gap-2">
                <h3 class="font-heading text-2xl font-bold tracking-tight text-warm-white">{{ item.name }}</h3>
                <span v-if="spice.label" class="shrink-0 text-xs font-semibold text-cheddar-yellow"
                    :title="`${spice.label} Spice`">
                    {{ spice.dots }} {{ spice.label }}
                </span>
            </div>
            <p class="text-sm leading-relaxed text-warm-white/85">{{ item.description }}</p>
            <div v-if="item.highlight_tag_1 || item.highlight_tag_2"
                class="flex items-center justify-between border-t border-warm-white/20 pt-3 text-xs font-medium text-warm-white/70">
                <span v-if="item.highlight_tag_1">{{ item.highlight_tag_1 }}</span>
                <span v-else></span>
                <span v-if="item.highlight_tag_2">{{ item.highlight_tag_2 }}</span>
            </div>
        </div>
    </article>
</template>
