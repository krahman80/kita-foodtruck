<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const props = defineProps({
    latitude: { type: [Number, String], default: null },
    longitude: { type: [Number, String], default: null },
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(['update']);

const el = ref(null);
let map = null;
let marker = null;

// Sapporo default center.
const DEFAULT = [43.0618, 141.3545];

function syncMarker() {
    if (!map) return;
    const lat = parseFloat(props.latitude);
    const lng = parseFloat(props.longitude);

    if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.circleMarker([lat, lng], {
                radius: 8,
                color: '#ea580c',
                fillColor: '#ea580c',
                fillOpacity: 0.9,
            }).addTo(map);
        }
        map.setView([lat, lng], Math.max(map.getZoom(), 14));
    } else if (marker) {
        map.removeLayer(marker);
        marker = null;
    }
}

function onMapClick(e) {
    if (props.disabled) return;
    emit('update', { lat: Number(e.latlng.lat.toFixed(6)), lng: Number(e.latlng.lng.toFixed(6)) });
}

function ensureSize() {
    if (map) map.invalidateSize();
}

onMounted(() => {
    if (!el.value) return;

    map = L.map(el.value, { scrollWheelZoom: false }).setView(DEFAULT, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    map.on('click', onMapClick);
    syncMarker();

    // Re-measure once after first layout, in case the container was not yet sized.
    requestAnimationFrame(ensureSize);
});

watch(
    () => [props.latitude, props.longitude],
    () => syncMarker(),
);

onBeforeUnmount(() => {
    if (map) {
        map.off('click', onMapClick);
        map.remove();
        map = null;
        marker = null;
    }
});
</script>

<template>
    <div :class="disabled ? 'pointer-events-none opacity-60' : ''">
        <div ref="el" class="z-0 h-72 w-full rounded-lg border border-gray-300 shadow-sm"></div>
    </div>
</template>
