<script setup>
import { ref } from 'vue';
import FaqItem from '@/Components/Public/FaqItem.vue';
import { t } from '@/i18n';

const faqs = [
    {
        id: 1,
        question: 'Where can I find and buy from your food truck?',
        answer:
            "Our food truck operates across designated public spots in central Sapporo from Wednesday through Sunday. Typical regular locations include Odori Park (Block 6), Sapporo Station North Plaza, and Maruyama Park entrance during festival weekends. You can check the live location module at the top of this website or follow our Instagram stories (@kitachilidogs_sapporo), which update at 9:00 AM each morning with the exact GPS pin and opening hours.",
    },
    {
        id: 2,
        question: 'What ingredients are used in your chili dogs and buns?',
        answer:
            "Our chili is made from coarse-ground 100% Halal beef brisket, stewed for 12 hours with peeled San Marzano tomatoes, sweet Hokkaido onions, roasted garlic, toasted cumin, Mexican ancho peppers, and smoked paprika. Our sausages are casing-stuffed 100% halal beef franks. The buns are custom brioche baked daily using Ebetsu wheat flour, water, yeast, a touch of butter, and Hokkaido milk. We never use MSG, pork fat, or artificial preservatives.",
    },
    {
        id: 3,
        question: 'How is your beef certified Halal?',
        answer:
            "All raw beef cuts are procured with formal Halal compliance certificates issued by recognized Islamic certification authorities (including FIANZ and regional Japan Halal associations). All equipment, steamers, and griddles on our truck are dedicated exclusively to halal beef and vegetarian side items.",
    },
    {
        id: 4,
        question: 'What payment methods do you accept at the food truck window?',
        answer:
            "We accept Japanese Yen cash (¥), Japanese transit IC cards (Kitaca, Suica, Pasmo, Icoca), PayPay QR payment, and major credit/debit cards (Visa, Mastercard, American Express, JCB) via contactless tap to pay.",
    },
    {
        id: 5,
        question: 'Can we book the orange truck for university festivals or private events?',
        answer:
            "Yes! We frequently cater at Hokkaido University events, international cultural fairs, ski lodge pop-ups, and corporate retreats around Sapporo and Otaru. Please reach out via our contact email at least two weeks in advance with your expected guest count.",
    },
];

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
                    Everything you need to know about finding our truck and enjoying our halal menu in Sapporo.
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
