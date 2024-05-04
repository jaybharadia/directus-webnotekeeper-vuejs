<template>
    <div style="display: flex'; flex-direction: column">
        <textarea
            style="display: block; width: 100%; margin-top: 16px"
            rows="10"
            v-model="note"
            placeholder="Notes are great way to store helpful information to access later. Get Started..."
        ></textarea>
        <button style="display: block; margin-top: 16px" @click="save">
            👍 Done
        </button>
    </div>
</template>

<script>
import { createItem } from "@directus/sdk";
export default {
    inject: ["directus"],
    data() {
        return {
            note: "testing",
        };
    },
    methods: {
        async save() {
            const [tab] = await chrome.tabs.query({
                active: true,
                lastFocusedWindow: true,
            });
            await this.directus.request(
                createItem("notes", {
                    note: this.note,
                    website: tab.url,
                })
            );
            this.$router.push({ name: "home" });
        },
    },
};
</script>
