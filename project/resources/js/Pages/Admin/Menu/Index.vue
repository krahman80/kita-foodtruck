<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { ref } from 'vue';
import { Head, router, useForm } from '@inertiajs/vue3';

const props = defineProps({
    menuItems: { type: Array, required: true },
});

const empty = () => ({
    name: '',
    description: '',
    price_yen: '',
    image: null,
    image_alt_text: '',
    spice_level: 'mild',
    category: 'chili_dog',
    badge_type: 'halal_standard',
    highlight_tag_1: '',
    highlight_tag_2: '',
    is_sold_out: false,
    is_active: true,
    display_order: 0,
});

const editingId = ref(null);
const form = useForm(empty());
const currentImage = ref('');
const newImagePreview = ref('');

const onPickFile = (e) => {
    const file = e.target.files[0] || null;
    form.image = file;
    newImagePreview.value = file ? URL.createObjectURL(file) : '';
    form.clearErrors('image');
};

const openCreate = () => {
    editingId.value = null;
    form.reset();
    form.clearErrors();
    currentImage.value = '';
    newImagePreview.value = '';
    Object.assign(form, empty());
};

const edit = (item) => {
    editingId.value = item.id;
    form.clearErrors();
    currentImage.value = item.image_url;
    newImagePreview.value = '';
    Object.assign(form, {
        name: item.name,
        description: item.description,
        price_yen: item.price_yen,
        image: null,
        image_alt_text: item.image_alt_text,
        spice_level: item.spice_level,
        category: item.category,
        badge_type: item.badge_type,
        highlight_tag_1: item.highlight_tag_1 ?? '',
        highlight_tag_2: item.highlight_tag_2 ?? '',
        is_sold_out: Boolean(item.is_sold_out),
        is_active: Boolean(item.is_active),
        display_order: item.display_order ?? 0,
    });
};

const submit = () => {
    if (editingId.value) {
        form.patch(route('admin.menu.update', editingId.value));
    } else {
        form.post(route('admin.menu.store'));
    }
};

const feature = (item) => router.post(route('admin.menu.feature', item.id), {}, { preserveScroll: true });
const toggleActive = (item) => router.post(route('admin.menu.toggle-active', item.id), {}, { preserveScroll: true });
const toggleSoldOut = (item) => router.post(route('admin.menu.toggle-sold-out', item.id), {}, { preserveScroll: true });

const label = (key) =>
    key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
</script>

<template>

    <Head title="Menu Items" />

    <AdminLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">Menu Items</h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <!-- Left column: Add/Edit editor -->
                    <div class="order-1 overflow-hidden rounded-lg bg-white shadow">
                        <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <h3 class="text-base font-semibold text-gray-800">
                                {{ editingId ? `Edit: ${form.name}` : 'Add Menu Item' }}
                            </h3>
                            <button v-if="editingId" type="button" @click="openCreate"
                                class="text-sm font-medium text-gray-500 hover:text-gray-700">
                                New item
                            </button>
                        </div>

                        <form class="p-6" @submit.prevent="submit">
                            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Name *</label>
                                    <input v-model="form.name" type="text"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                    <p v-if="form.errors.name" class="mt-1 text-sm text-red-600">{{ form.errors.name }}
                                    </p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Price (¥) *</label>
                                    <input v-model="form.price_yen" type="number" min="1" step="1"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                    <p v-if="form.errors.price_yen" class="mt-1 text-sm text-red-600">{{
                                        form.errors.price_yen }}
                                    </p>
                                </div>

                                <div class="sm:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700">Description *</label>
                                    <textarea v-model="form.description" rows="2"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange"></textarea>
                                    <p v-if="form.errors.description" class="mt-1 text-sm text-red-600">{{
                                        form.errors.description
                                    }}</p>
                                </div>

                                <div class="sm:col-span-2">
                                    <label class="block text-sm font-medium text-gray-700">Image *</label>
                                    <input type="file" accept="image/*" @change="onPickFile"
                                        class="mt-1 block w-full text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-truck-orange/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-deep hover:file:bg-truck-orange/20" />
                                    <p v-if="form.errors.image" class="mt-1 text-sm text-red-600">{{ form.errors.image
                                    }}
                                    </p>

                                    <img v-if="newImagePreview" :src="newImagePreview" alt="Selected image preview"
                                        class="mt-3 h-32 w-48 rounded-md border border-gray-200 object-cover" />
                                    <div v-else-if="editingId && currentImage" class="mt-3 flex items-center gap-3">
                                        <img :src="currentImage" :alt="form.image_alt_text || 'Current image'"
                                            class="h-32 w-48 rounded-md border border-gray-200 object-cover" />
                                        <span class="text-xs text-gray-500">Current image — pick a new file to replace
                                            it.</span>
                                    </div>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Image alt text *</label>
                                    <input v-model="form.image_alt_text" type="text"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                    <p v-if="form.errors.image_alt_text" class="mt-1 text-sm text-red-600">{{
                                        form.errors.image_alt_text }}</p>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Spice level</label>
                                    <select v-model="form.spice_level"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange">
                                        <option value="mild">Mild</option>
                                        <option value="medium">Medium</option>
                                        <option value="hot">Hot</option>
                                        <option value="tangy">Tangy</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Category</label>
                                    <select v-model="form.category"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange">
                                        <option value="chili_dog">Chili Dog</option>
                                        <option value="drink">Drink</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Badge</label>
                                    <select v-model="form.badge_type"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange">
                                        <option value="halal_standard">Halal Standard</option>
                                        <option value="limited_batch">Limited Batch</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Display order</label>
                                    <input v-model="form.display_order" type="number" min="0" step="1"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Highlight tag 1</label>
                                    <input v-model="form.highlight_tag_1" type="text"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Highlight tag 2</label>
                                    <input v-model="form.highlight_tag_2" type="text"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-truck-orange focus:ring-truck-orange" />
                                </div>

                                <div class="sm:col-span-2 flex flex-wrap gap-6">
                                    <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <input type="checkbox" v-model="form.is_active"
                                            class="h-4 w-4 rounded border-gray-300 text-truck-orange focus:ring-truck-orange" />
                                        Active (shown publicly)
                                    </label>
                                    <label class="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <input type="checkbox" v-model="form.is_sold_out"
                                            class="h-4 w-4 rounded border-gray-300 text-truck-orange focus:ring-truck-orange" />
                                        Sold out
                                    </label>
                                </div>
                            </div>

                            <div class="mt-6 flex items-center gap-3">
                                <button type="submit" :disabled="form.processing"
                                    class="inline-flex items-center rounded-md bg-truck-orange px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-soft disabled:opacity-50">
                                    {{ form.processing ? 'Saving…' : editingId ? 'Save changes' : 'Add item' }}
                                </button>
                                <button v-if="editingId" type="button" :disabled="form.processing" @click="openCreate"
                                    class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50">
                                    Cancel edit
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Right column: item cards -->
                    <div class="order-2 overflow-hidden rounded-lg bg-white shadow">
                        <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                            <h3 class="text-base font-semibold text-gray-800">Items ({{ menuItems.length }})</h3>
                        </div>

                        <ul class="divide-y divide-gray-200">
                            <li v-for="item in menuItems" :key="item.id" class="flex items-center gap-4 px-5 py-4"
                                :class="{ 'opacity-60': !item.is_active }">
                                <!-- Thumbnail -->
                                <img :src="item.image_url" :alt="item.image_alt_text || item.name"
                                    class="h-16 w-16 shrink-0 rounded-md border border-gray-200 object-cover" />

                                <!-- Info -->
                                <div class="min-w-0 flex-1">
                                    <div class="flex flex-wrap items-center gap-1.5">
                                        <span class="truncate text-sm font-semibold text-gray-900">{{ item.name
                                            }}</span>
                                        <span v-if="item.is_popular"
                                            class="rounded-full bg-truck-orange/20 px-2 py-0.5 text-[11px] font-semibold text-orange-deep">Featured</span>
                                    </div>
                                    <div
                                        class="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                        <span>{{ label(item.category) }}</span>
                                        <span class="font-semibold text-gray-900">¥{{ item.price_yen.toLocaleString()
                                            }}</span>
                                        <span v-if="item.is_sold_out"
                                            class="rounded bg-orange-100 px-1.5 py-0.5 text-orange-700">Sold out</span>
                                        <span class="rounded px-1.5 py-0.5"
                                            :class="item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'">
                                            {{ item.is_active ? 'Active' : 'Inactive' }}
                                        </span>
                                    </div>
                                    <p class="mt-0.5 truncate text-xs text-gray-400">{{ item.slug }}</p>
                                </div>

                                <!-- Actions -->
                                <div
                                    class="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-2">
                                    <button type="button"
                                        class="text-sm font-medium text-truck-orange hover:text-orange-soft"
                                        @click="edit(item)">Edit</button>
                                    <button v-if="item.is_active && !item.is_popular" type="button"
                                        class="text-sm font-medium text-purple-600 hover:text-purple-500"
                                        @click="feature(item)">Feature</button>
                                    <button type="button" class="text-sm font-medium text-gray-600 hover:text-gray-500"
                                        @click="toggleActive(item)">{{ item.is_active ? 'Hide' : 'Show' }}</button>
                                    <button type="button"
                                        class="text-sm font-medium text-orange-600 hover:text-orange-500"
                                        @click="toggleSoldOut(item)">{{ item.is_sold_out ? 'Restock' : 'Sold out'
                                        }}</button>
                                </div>
                            </li>
                            <li v-if="menuItems.length === 0" class="px-6 py-10 text-center text-sm text-gray-500">
                                No menu items yet. Add your first item in the form.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>