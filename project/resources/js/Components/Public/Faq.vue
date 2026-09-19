<script setup>
import { computed, ref } from 'vue';
import FaqItem from '@/Components/Public/FaqItem.vue';
import { t } from '@/i18n';

// Content lives in the locale files rather than in this component: hardcoded
// here it was invisible to translators and to any key-coverage check.
const faqs = computed(() => [
    { id: 1, question: t('faq.q1'), answer: t('faq.a1') },
    { id: 2, question: t('faq.q2'), answer: t('faq.a2') },
    { id: 3, question: t('faq.q3'), answer: t('faq.a3') },
    { id: 4, question: t('faq.q4'), answer: t('faq.a4') },
    { id: 5, question: t('faq.q5'), answer: t('faq.a5') },
]);

// One open at a time (first open by default).
const openIndex = ref(0);

const toggle = (index) => {
    openIndex.value = openIndex.value === index ? -1 : index;
};
</script>

<template>
    <!-- ==========================================
         SECTION 7: FAQ (accordion, one-open-at-a-time)
         ========================================== -->
    <section id="faq-section" class="bg-warm-white py-12 md:py-16">
        <div class="mx-auto max-w-[1140px] px-4 sm:px-6 lg:px-8">

            <!-- Section Heading -->
            <div class="mx-auto mb-12 max-w-2xl text-center">
                <span class="text-xs font-bold uppercase tracking-widest text-truck-orange">
                    {{ t('faq.eyebrow') }}
                </span>
                <h2 class="mt-1.5 font-heading text-3xl font-bold text-charcoal-brown sm:text-4xl">
                    {{ t('faq.title') }}
                </h2>
                <p class="mt-2 text-base text-charcoal-brown/75">
                    {{ t('faq.subtitle') }}
                </p>
            </div>

            <!-- Stacked Q&A Accordion -->
            <div class="mx-auto max-w-3xl space-y-4">
                <FaqItem v-for="(faq, index) in faqs" :key="faq.id" :id="faq.id" :question="faq.question"
                    :answer="faq.answer" :is-open="openIndex === index" @toggle="toggle(index)" />
            </div>

        </div>
    </section>
</template>
