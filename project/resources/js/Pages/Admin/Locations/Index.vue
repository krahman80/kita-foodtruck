<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import DatePicker from 'primevue/datepicker';
import LocationPicker from '@/Components/LocationPicker.vue';
import { computed, ref, watch } from 'vue';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';

const props = defineProps({
    locations: {
        type: Array,
        required: true,
    },
});

const page = usePage();

/* ---------- helpers ---------- */
const toKey = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

const pad = (n) => String(n).padStart(2, '0');
/* PrimeVue DatePicker #date slot gives a day object { day, month (0-based), year } */
const dayKey = (d) =>
    d && d.year != null && d.month != null && d.day != null
        ? `${d.year}-${pad(d.month + 1)}-${pad(d.day)}`
        : null;

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const today = startOfDay(new Date());

/* keyed index of existing entries by date */
const markerMap = computed(() => {
    const map = new Map();
    for (const loc of props.locations) map.set(loc.schedule_date, loc);
    return map;
});

/* ---------- state ---------- */
const selectedDate = ref(null); // Date | null (chosen via calendar)
const editingId = ref(null); // id when editing an existing entry
const isCancelled = ref(false);

const form = useForm({
    schedule_date: '',
    location_name: '',
    address: '',
    landmark_note: '',
    start_time: '',
    end_time: '',
    latitude: '',
    longitude: '',
    map_pin_note: '',
    transit_note: '',
    is_event: false,
    event_name: '',
});

/* selected day's details */
const selectedKey = computed(() => (selectedDate.value ? toKey(selectedDate.value) : null));
const selectedEntry = computed(() => (selectedKey.value ? markerMap.value.get(selectedKey.value) : null));
const isPast = computed(() => (selectedKey.value ? startOfDay(new Date(`${selectedKey.value}T00:00:00`)) < today : false));
const hasSelection = computed(() => selectedDate.value !== null);
const editable = computed(() => hasSelection.value && !isPast.value);

const flash = computed(() => page.props.flash ?? null);

/* ---------- selecting a day ---------- */
function onDateSelect(date) {
    selectedDate.value = date;
    const key = toKey(date);
    const entry = markerMap.value.get(key);
    form.clearErrors();
    editingId.value = entry ? entry.id : null;
    isCancelled.value = entry ? entry.status === 'cancelled' : false;

    if (entry) {
        form.schedule_date = entry.schedule_date;
        form.location_name = entry.location_name ?? '';
        form.address = entry.address ?? '';
        form.landmark_note = entry.landmark_note ?? '';
        form.start_time = entry.start_time ? entry.start_time.slice(0, 5) : '';
        form.end_time = entry.end_time ? entry.end_time.slice(0, 5) : '';
        form.latitude = entry.latitude ?? '';
        form.longitude = entry.longitude ?? '';
        form.map_pin_note = entry.map_pin_note ?? '';
        form.transit_note = entry.transit_note ?? '';
        form.is_event = Boolean(entry.is_event);
        form.event_name = entry.event_name ?? '';
    } else {
        form.reset();
        form.schedule_date = key;
    }
}

/* re-select after props refresh (post-save) so the marker/state stay in sync */
watch(
    () => props.locations,
    () => {
        if (selectedKey.value) onDateSelect(selectedDate.value);
    },
);

/* ---------- actions ---------- */
const submit = () => {
    if (editingId.value) {
        form.patch(route('admin.locations.update', editingId.value));
    } else {
        form.post(route('admin.locations.store'));
    }
};

const cancelStop = () => {
    if (!editingId.value) return;
    router.post(route('admin.locations.cancel', editingId.value), {}, { preserveScroll: true });
};

const onPickLocation = ({ lat, lng }) => {
    form.latitude = lat;
    form.longitude = lng;
};
</script>

<template>

    <Head title="Locations" />

    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">Location Calendar</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <!-- Flash -->
                <div v-if="flash?.message" class="mb-6 rounded-lg border px-4 py-3 text-sm" :class="flash.type === 'warning'
                    ? 'border-amber-200 bg-amber-50 text-amber-800'
                    : 'border-green-200 bg-green-50 text-green-800'">
                    {{ flash.message }}
                </div>

                <div class="grid grid-cols-1 gap-8 lg:grid-cols-5">
                    <!-- Calendar column -->
                    <div class="lg:col-span-2">
                        <div class="rounded-xl bg-white p-4 shadow">
                            <DatePicker v-model="selectedDate" inline :number-of-months="1" @date-select="onDateSelect">
                                <template #date="{ date }">
                                    <div class="relative flex flex-col items-center py-1">
                                        <span>{{ date.day }}</span>
                                        <span v-if="markerMap.get(dayKey(date))?.status === 'scheduled'"
                                            class="mt-1 h-1.5 w-1.5 rounded-full"
                                            :class="markerMap.get(dayKey(date)).is_event ? 'bg-purple-500' : 'bg-orange-500'" />
                                        <span v-else-if="markerMap.get(dayKey(date))?.status === 'cancelled'"
                                            class="mt-1 h-1 w-3 rounded-sm bg-gray-300" />
                                    </div>
                                </template>
                            </DatePicker>

                            <!-- Legend -->
                            <div
                                class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-gray-100 px-1 pt-4 text-xs text-gray-500">
                                <span class="flex items-center gap-1.5">
                                    <span class="h-1.5 w-1.5 rounded-full bg-orange-500"></span> Stop
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <span class="h-1.5 w-1.5 rounded-full bg-purple-500"></span> Event
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <span class="h-1 w-3 rounded-sm bg-gray-300"></span> Cancelled
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Form column -->
                    <div class="lg:col-span-3">
                        <div class="overflow-hidden rounded-xl bg-white shadow">
                            <div class="border-b border-gray-200 px-6 py-4">
                                <h3 class="text-base font-semibold text-gray-800">
                                    {{ editingId ? 'Edit Stop' : 'Add a Stop' }}
                                </h3>
                                <p v-if="!hasSelection" class="mt-1 text-sm text-gray-500">
                                    Pick a date on the calendar to enable this form.
                                </p>
                                <p v-else-if="isPast" class="mt-1 text-sm text-amber-600">
                                    Past dates are read-only — plan future stops only.
                                </p>
                            </div>

                            <form class="p-6" @submit.prevent="submit" :disabled="!editable">
                                <fieldset :disabled="!editable" class="space-y-4 disabled:opacity-50">
                                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Date</label>
                                            <input type="date" v-model="form.schedule_date" readonly
                                                class="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Location name
                                                *</label>
                                            <input type="text" v-model="form.location_name" required
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                            <p v-if="form.errors.location_name" class="mt-1 text-sm text-red-600">{{
                                                form.errors.location_name }}</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Address</label>
                                            <input type="text" v-model="form.address"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Landmark note</label>
                                            <input type="text" v-model="form.landmark_note"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">Start time *</label>
                                            <input type="time" v-model="form.start_time" required
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                            <p v-if="form.errors.start_time" class="mt-1 text-sm text-red-600">{{
                                                form.errors.start_time }}</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700">End time *</label>
                                            <input type="time" v-model="form.end_time" required
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                            <p v-if="form.errors.end_time" class="mt-1 text-sm text-red-600">{{
                                                form.errors.end_time }}</p>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">Location on
                                                map</label>
                                            <p class="mt-0.5 text-xs text-gray-500">
                                                Click the map to set latitude &amp; longitude, or type them below.
                                            </p>
                                            <div class="mt-2 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                                                <LocationPicker :latitude="form.latitude" :longitude="form.longitude"
                                                    :disabled="!editable" @update="onPickLocation" />
                                                <div class="space-y-3">
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-700">Latitude</label>
                                                        <input type="number" step="any" v-model="form.latitude"
                                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                                        <p v-if="form.errors.latitude"
                                                            class="mt-1 text-sm text-red-600">{{
                                                                form.errors.latitude }}</p>
                                                    </div>
                                                    <div>
                                                        <label
                                                            class="block text-sm font-medium text-gray-700">Longitude</label>
                                                        <input type="number" step="any" v-model="form.longitude"
                                                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                                        <p v-if="form.errors.longitude"
                                                            class="mt-1 text-sm text-red-600">{{
                                                                form.errors.longitude }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">Map pin note</label>
                                            <input type="text" v-model="form.map_pin_note"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                        </div>
                                        <div class="sm:col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">Transit note</label>
                                            <input type="text" v-model="form.transit_note"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                        </div>

                                        <div class="sm:col-span-2 flex items-center gap-2">
                                            <input id="is_event" type="checkbox" v-model="form.is_event"
                                                class="h-4 w-4 rounded border-gray-300 text-truck-orange focus:ring-truck-orange" />
                                            <label for="is_event" class="text-sm font-medium text-gray-700">
                                                This stop is an event
                                            </label>
                                        </div>

                                        <div v-if="form.is_event" class="sm:col-span-2">
                                            <label class="block text-sm font-medium text-gray-700">Event name *</label>
                                            <input type="text" v-model="form.event_name"
                                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                            <p v-if="form.errors.event_name" class="mt-1 text-sm text-red-600">{{
                                                form.errors.event_name }}</p>
                                        </div>
                                    </div>
                                </fieldset>

                                <div v-if="editable" class="mt-6 flex items-center gap-3">
                                    <button type="submit" :disabled="form.processing"
                                        class="inline-flex items-center rounded-md bg-truck-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-soft disabled:opacity-50">
                                        {{ form.processing ? 'Saving…' : editingId ? 'Save changes' : 'Save stop' }}
                                    </button>

                                    <button v-if="editingId && !isCancelled" type="button" @click="cancelStop"
                                        class="inline-flex items-center rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-50">
                                        Cancel this stop
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<style scoped>
/* Make the inline DatePicker fill its white card container */
:deep(.p-datepicker),
:deep(.p-datepicker-inline) {
    width: 100%;
}

:deep(.p-datepicker .p-datepicker-group) {
    width: 100%;
}

:deep(.p-datepicker table) {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
}

:deep(.p-datepicker td) {
    padding: 0;
    text-align: center;
}

:deep(.p-datepicker td > span) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 2.75rem;
    border-radius: 0.5rem;
}
</style>
