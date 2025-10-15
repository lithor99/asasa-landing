<template>
    <div class="flex h-screen flex-col">
        <LayoutAppBar />

        <!-- Main Content Area -->
        <main class="flex-1 bg-gray-50 overflow-auto">
            <NuxtPage />
        </main>

        <!-- Snackbar - Outside main to ensure it's always on top -->
        <Snackbar />

        <!-- <Footer /> -->
    </div>
</template>
