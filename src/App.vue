<template>
    <div
        style="
            width: 320px;
            border-radius: 24px;
            border: 1px solid gray;
            padding: 16px;
        "
    >
        <div
            style="
                display: flex;
                justify-content: space-between;
                align-items: center;
            "
        >
            <div style="font-size: 24px; font-weight: bold">
                ✍️ Directus Notes
            </div>
        </div>

        <RouterView />
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
