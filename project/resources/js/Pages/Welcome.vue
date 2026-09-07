<script setup>
import PublicLayout from '@/Layouts/PublicLayout.vue';
import Hero from '@/Components/Public/Hero.vue';
import LocationSchedule from '@/Components/Public/LocationSchedule.vue';
import MenuGallery from '@/Components/Public/MenuGallery.vue';
import AboutStory from '@/Components/Public/AboutStory.vue';
import AllergenInfo from '@/Components/Public/AllergenInfo.vue';
import Faq from '@/Components/Public/Faq.vue';

defineProps({
    todayLocation: {
        type: Object,
        default: null,
    },
    nextLocation: {
        type: Object,
        default: null,
    },
    menuItems: {
        type: Array,
        default: () => [],
    },
    popularItem: {
        type: Object,
        default: null,
    },
    heroItem: {
        type: Object,
        default: null,
    },
    upcomingEvent: {
        type: Object,
        default: null,
    },
});
</script>

<template>
    <!-- Public page composed from section components (Sprint 3 decomposition). -->
    <PublicLayout title="Welcome | Halal Chili Dog Sapporo">
        <Hero :popular-item="popularItem" :hero-item="heroItem" :upcoming-event="upcomingEvent" />

        <LocationSchedule :location="todayLocation" :next-location="nextLocation" />

        <MenuGallery :items="menuItems" />

        <AboutStory />

        <AllergenInfo />

        <Faq />
    </PublicLayout>
</template>
