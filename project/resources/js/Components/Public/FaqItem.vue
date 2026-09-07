<script setup>
defineProps({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    isOpen: { type: Boolean, default: false },
});

defineEmits(['toggle']);
</script>

<template>
    <div class="faq-card overflow-hidden rounded-2xl border border-toasted-tan/30 bg-warm-white transition-colors">
        <button type="button" @click="$emit('toggle')"
            class="faq-toggle-btn flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-truck-orange"
            :aria-expanded="isOpen" :aria-controls="`faq-answer-${id}`">
            <span class="font-heading text-lg font-bold text-charcoal-brown">
                {{ question }}
            </span>
            <span
                class="faq-icon-wrapper flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tan-subtle text-charcoal-brown transition-transform duration-200"
                :class="isOpen ? 'rotate-180' : ''">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </span>
        </button>
        <div v-if="isOpen" :id="`faq-answer-${id}`"
            class="faq-content border-t border-toasted-tan/15 px-6 pb-6 pt-1 text-sm leading-relaxed text-charcoal-brown/80">
            {{ answer }}
        </div>
    </div>
</template>
