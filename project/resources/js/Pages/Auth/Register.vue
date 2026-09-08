<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { t } from '@/i18n';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>

        <Head :title="t('auth.registerTitle')" />

        <div class="mb-6 text-center">
            <h1 class="font-heading text-2xl font-bold text-charcoal-brown">{{ t('auth.createAccount') }}</h1>
            <p class="mt-1 text-sm text-charcoal-brown/60">{{ t('auth.registerHint') }}</p>
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" :value="t('auth.name')" />

                <TextInput id="name" type="text" class="mt-1 block w-full" v-model="form.name" required autofocus
                    autocomplete="name" />

                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <div class="mt-4">
                <InputLabel for="email" :value="t('auth.email')" />

                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required
                    autocomplete="username" />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" :value="t('auth.password')" />

                <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
                    autocomplete="new-password" />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" :value="t('auth.confirmPassword')" />

                <TextInput id="password_confirmation" type="password" class="mt-1 block w-full"
                    v-model="form.password_confirmation" required autocomplete="new-password" />

                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="mt-4 flex items-center justify-end">
                <Link :href="route('login')"
                    class="rounded-md text-sm font-medium text-truck-orange underline hover:text-orange-soft focus:outline-none focus:ring-2 focus:ring-truck-orange focus:ring-offset-2">
                    {{ t('auth.alreadyRegistered') }}
                </Link>

                <button type="submit" :disabled="form.processing"
                    class="ms-4 inline-flex items-center justify-center rounded-lg bg-truck-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-soft focus:outline-none focus:ring-2 focus:ring-truck-orange focus:ring-offset-2 disabled:opacity-40">
                    {{ form.processing ? t('auth.registering') : t('auth.register') }}
                </button>
            </div>
        </form>
    </GuestLayout>
</template>
