<template>
    <div class="flex-col items-center">
        <h1 class="text-gray-700 text-6xl">
            ERROR
        </h1>
        <p class="text-gray-600 text-xl text-center">
            Route not found.
        </p>
        <router-link 
        to="/" 
        class="mt-5 text-xl text-green-600 hover:underline">
            Back to main page
        </router-link>

    </div>
</template>

<script>

export default {
    name: "Error Page"
};
</script>