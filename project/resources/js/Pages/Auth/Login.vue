<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { t } from '@/i18n';

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>

        <Head :title="t('auth.logInTitle')" />

        <div v-if="status" class="mb-4 text-sm font-medium text-forest">
            {{ status }}
        </div>

        <div class="mb-6 text-center">
            <h1 class="font-heading text-2xl font-bold text-charcoal-brown">{{ t('auth.welcomeBack') }}</h1>
            <p class="mt-1 text-sm text-charcoal-brown/60">{{ t('auth.signInHint') }}</p>
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" :value="t('auth.email')" />

                <TextInput id="email" type="email" class="mt-1 block w-full" v-model="form.email" required autofocus
                    autocomplete="username" />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" :value="t('auth.password')" />

                <TextInput id="password" type="password" class="mt-1 block w-full" v-model="form.password" required
                    autocomplete="current-password" />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4 block">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ms-2 text-sm text-gray-600">{{ t('auth.remember') }}</span>
                </label>
            </div>

            <div class="mt-4 flex items-center justify-end">
                <Link v-if="canResetPassword" :href="route('password.request')"
                    class="rounded-md text-sm font-medium text-truck-orange underline hover:text-orange-soft focus:outline-none focus:ring-2 focus:ring-truck-orange focus:ring-offset-2">
                    {{ t('auth.forgot') }}
                </Link>

                <button type="submit" :disabled="form.processing"
                    class="ms-4 inline-flex items-center justify-center rounded-lg bg-truck-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-soft focus:outline-none focus:ring-2 focus:ring-truck-orange focus:ring-offset-2 disabled:opacity-40">
                    {{ form.processing ? t('auth.signingIn') : t('auth.logIn') }}
                </button>
            </div>
        </form>
    </GuestLayout>
</template>
